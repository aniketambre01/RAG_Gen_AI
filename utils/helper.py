"""
helper.py

Utility functions for the Streamlit RAG application.
"""

import os
from pathlib import Path
from typing import List

import streamlit as st
from dotenv import load_dotenv

load_dotenv()


def ensure_directories():
    """
    Create required project directories if they don't exist.
    """

    upload_folder = os.getenv("UPLOAD_FOLDER", "./uploaded_files")
    db_folder = os.getenv("CHROMA_DB_PATH", "./database")

    Path(upload_folder).mkdir(parents=True, exist_ok=True)
    Path(db_folder).mkdir(parents=True, exist_ok=True)


def save_uploaded_files(uploaded_files) -> List[str]:
    """
    Save uploaded Streamlit files.

    Returns:
        List of saved file paths.
    """

    upload_folder = os.getenv("UPLOAD_FOLDER", "./uploaded_files")

    saved_files = []

    for uploaded_file in uploaded_files:

        file_path = os.path.join(upload_folder, uploaded_file.name)

        with open(file_path, "wb") as f:
            f.write(uploaded_file.getbuffer())

        saved_files.append(file_path)

    return saved_files


def format_sources(documents):
    """
    Convert retrieved documents into a format suitable for display.
    """

    sources = []

    for doc in documents:

        sources.append(
            {
                "source": doc.metadata.get("source", "Unknown"),
                "page": doc.metadata.get("page", "-"),
                "chunk": doc.metadata.get("chunk", "-"),
                "content": doc.page_content,
            }
        )

    return sources


def initialize_session_state():
    """
    Initialize Streamlit session state variables.
    """

    defaults = {
        "messages": [],
    "database_ready": False,
    "last_sources": [],
    }

    for key, value in defaults.items():
        if key not in st.session_state:
            st.session_state[key] = value


def clear_chat():
    """
    Clear the chat history.
    """

    st.session_state.messages = []


def get_database_stats(vector_store):
    """
    Get database statistics.
    """

    try:
        return {
            "chunks": vector_store.document_count(),
            "status": "Ready",
        }

    except Exception:

        return {
            "chunks": 0,
            "status": "Empty",
        }


def supported_file(filename: str) -> bool:
    """
    Check if uploaded file type is supported.
    """

    allowed_extensions = [
        ".pdf",
        ".docx",
        ".txt",
    ]

    extension = os.path.splitext(filename)[1].lower()

    return extension in allowed_extensions


def remove_duplicate_sources(documents):
    """
    Remove duplicate source entries.
    """

    seen = set()
    unique_docs = []

    for doc in documents:

        key = (
            doc.metadata.get("source"),
            doc.metadata.get("page"),
            doc.metadata.get("chunk"),
        )

        if key not in seen:
            seen.add(key)
            unique_docs.append(doc)

    return unique_docs


def display_sources(documents):
    """
    Display source chunks in Streamlit.
    """

    if not documents:
        return

    st.subheader("📄 Sources")

    for doc in remove_duplicate_sources(documents):

        with st.expander(
            f"{doc.metadata.get('source')} | Page {doc.metadata.get('page', '-')}"
        ):

            st.markdown(
                f"**Chunk:** {doc.metadata.get('chunk', '-')}"
            )

            st.write(doc.page_content)