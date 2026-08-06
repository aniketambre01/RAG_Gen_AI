import os

import streamlit as st
from dotenv import load_dotenv

# Load environment variables
load_dotenv() 

from utils.document_loader import DocumentLoader
from utils.vector_store import VectorStore
from utils.rag_chain import RAGChain
from utils.helper import (
    ensure_directories,
    save_uploaded_files,
    initialize_session_state,
    get_database_stats,
    supported_file,
    clear_chat,
)

# =====================================================
# Load Environment Variables
# =====================================================

load_dotenv()

# =====================================================
# Initialize Project
# =====================================================

ensure_directories()
initialize_session_state()

# =====================================================
# Streamlit Page Configuration
# =====================================================

st.set_page_config(
    page_title="📚 Chat with Documents",
    page_icon="📚",
    layout="wide",
    initial_sidebar_state="expanded",
)

# =====================================================
# Initialize Components
# =====================================================

loader = DocumentLoader()


@st.cache_resource
def get_vector_store():

    store = VectorStore()

    return store


vector_store = get_vector_store()

# =====================================================
# Database Status Check
# =====================================================

if os.path.exists("database/chroma.sqlite3"):

    st.session_state.database_ready = True

else:

    st.session_state.database_ready = False

@st.cache_resource
def get_rag_chain():

    return RAGChain(
        vector_store
    )


rag = get_rag_chain()

# =====================================================
# Application Title
# =====================================================

st.title("📚 Chat with Your Documents")

st.markdown(
    """
Upload PDF, DOCX, or TXT files, build a vector database,
and ask questions using the Mistral AI model.
"""
)

# =====================================================
# Sidebar
# =====================================================

with st.sidebar:

    st.header("⚙️ Control Panel")


        # -----------------------------
        # Database Status
        # -----------------------------

    if vector_store.document_count() > 0:

        st.success(
            f"Existing knowledge base loaded ({vector_store.document_count()} chunks)"
        )

    else:

        st.info(
            "No knowledge base found. Upload documents."
        )


    st.divider()


    stats = get_database_stats(vector_store)

    st.subheader("📊 Database Status")

    st.metric(
        "Chunks",
        stats["chunks"],
    )

    st.metric(
        "Status",
        stats["status"],
    )

    st.divider()

    st.subheader("📂 Upload Files")

    uploaded_files = st.file_uploader(
        "Choose files",
        type=["pdf", "docx", "txt"],
        accept_multiple_files=True,
    )

    st.divider()

    st.subheader("🛠 Actions")

    build_db = st.button(
        "🚀 Create Vector Database",
        use_container_width=True,
    )

    clear_chat_button = st.button(
        "🧹 Clear Chat",
        use_container_width=True,
    )

    clear_database = st.button(
    "🗑 Clear Database",
    use_container_width=True,
    )   

# =====================================================
# Button Actions
# =====================================================

if clear_chat_button:
    clear_chat()
    st.success("Chat history cleared.")
    st.rerun()


# =====================================================
# Build Vector Database
# =====================================================

if build_db:

    if not uploaded_files:
        st.warning("Please upload at least one document.")
        st.stop()

    invalid_files = [
        file.name
        for file in uploaded_files
        if not supported_file(file.name)
    ]

    if invalid_files:
        st.error(
            f"Unsupported files: {', '.join(invalid_files)}"
        )
        st.stop()

    try:

        with st.spinner("Saving uploaded files..."):

            saved_files = save_uploaded_files(
                uploaded_files
            )

        progress_bar = st.progress(0)

        status = st.empty()

        # Clear old database to avoid duplicate vectors
        vector_store.reset_database()

        all_documents = []

        total_files = len(saved_files)

        for index, file_path in enumerate(saved_files):

            filename = os.path.basename(file_path)

            status.info(
                f"Processing {filename} ({index+1}/{total_files})..."
            )

            documents = loader.load_and_split(
                file_path
            )

            all_documents.extend(documents)

            progress_bar.progress(
                (index + 1) / total_files
            )

        status.info("Creating embeddings...")

        vector_store.add_documents(
            all_documents
        )

        st.session_state.database_ready = True

        progress_bar.progress(1.0)

        status.success(
            "Knowledge Base created successfully!"
        )

        st.success(
            f"""
            Successfully processed

            • Files : {len(saved_files)}

            • Chunks : {len(all_documents)}

            Your documents are now ready for questions.
            """
        )

        st.balloons()

    except Exception as e:

        st.error(
            f"Error while creating vector database:\n\n{str(e)}"
        )

# =====================================================
# Database Check
# =====================================================

if vector_store.document_count() > 0:

    st.session_state.database_ready = True

else:

    st.session_state.database_ready = False

# =====================================================
# Ready Message
# =====================================================

if st.session_state.database_ready:

    st.success(
        f"✅ Knowledge Base Ready ({vector_store.document_count()} chunks)"
    )

else:

    st.info(
        "📂 Upload one or more documents from the sidebar and click **Create Vector Database**."
    )

st.divider()

# =====================================================
# Display Previous Chat Messages
# =====================================================

for message in st.session_state.messages:

    with st.chat_message(message["role"]):

        st.markdown(message["content"])



# =====================================================
# Chat Input
# =====================================================

question = st.chat_input(
    "Ask a question about your uploaded documents..."
)

if question:

    if not st.session_state.database_ready:

        st.warning(
            "Please upload documents and create the vector database first."
        )

        st.stop()

    # -----------------------------
    # Show User Message
    # -----------------------------

    st.session_state.messages.append(
        {
            "role": "user",
            "content": question,
        }
    )

    with st.chat_message("user"):

        st.markdown(question)

    # -----------------------------
    # Generate AI Response
    # -----------------------------

    with st.chat_message("assistant"):

        thinking = st.empty()

        thinking.info("🔍 Searching documents...")

        try:

            response = rag.ask(question)

            answer = response["answer"]

            sources = response["sources"]

            thinking.empty()

            placeholder = st.empty()

            streamed_text = ""

            words = answer.split()

            for word in words:

                streamed_text += word + " "

                placeholder.markdown(streamed_text + "▌")

            placeholder.markdown(streamed_text)

            st.session_state.messages.append(
                {
                    "role": "assistant",
                    "content": answer,
                }
            )

            st.session_state.last_sources = sources

        except Exception as e:

            thinking.empty()

            st.error(str(e))




# =====================================================
# Display Retrieved Sources
# =====================================================

if (
    st.session_state.database_ready
    and st.session_state.last_sources
):

    st.divider()

    st.subheader("📄 Retrieved Source Chunks")

    for index, doc in enumerate(
        st.session_state.last_sources,
        start=1
    ):

        source = doc.metadata.get(
            "source",
            "Unknown"
        )

        page = doc.metadata.get(
            "page",
            "-"
        )

        chunk = doc.metadata.get(
            "chunk",
            "-"
        )

        with st.expander(
            f"Source {index} | {source} | Page {page}"
        ):

            st.markdown(
                f"**Chunk:** {chunk}"
            )

            st.write(doc.page_content)


# =====================================================
# Reset Vector Database
# =====================================================

# =====================================================
# Clear Vector Database
# =====================================================

if clear_database:

    try:

        vector_store.reset_database()

        # Clear cached Chroma connection
        st.cache_resource.clear()


        st.session_state.database_ready = False

        st.session_state.messages = []

        st.session_state.last_sources = []


        st.sidebar.success(
            "Database cleared successfully"
        )


        st.rerun()


    except Exception as e:

        st.sidebar.error(
            f"Failed to clear database: {str(e)}"
        )

# =====================================================
# Sidebar Information
# =====================================================

with st.sidebar:

    st.divider()

    st.subheader("ℹ️ Information")

    st.write(
        f"Stored Chunks: **{vector_store.document_count()}**"
    )

    st.write(
        f"Chat Messages: **{len(st.session_state.messages)}**"
    )

    if st.session_state.database_ready:

        st.success("Knowledge Base Ready")

    else:

        st.warning("Knowledge Base Not Created")


# =====================================================
# Footer
# =====================================================

st.divider()

st.caption(
    "🚀 Built with Streamlit • ChromaDB • LangChain • Mistral AI"
)