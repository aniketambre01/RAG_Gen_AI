<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/163d0e1a-4057-4503-829d-c9ec96095fab" /># 📚 AI-Powered Document Chatbot — RAG

An AI-powered **Document Question Answering system** built with **Python, Streamlit, LangChain, ChromaDB, Mistral AI, and embeddings**.

The application allows users to upload documents, convert their content into vector embeddings, store them in a vector database, and ask natural-language questions about the uploaded documents using a **Retrieval-Augmented Generation (RAG)** pipeline.

---

## 🚀 Project Overview

Traditional LLM applications can generate answers based on their pretrained knowledge, but they may not have access to information contained in a user's private documents.

This project solves that problem using **Retrieval-Augmented Generation (RAG)**.

Users can:

1. Upload documents.
2. Extract text from the documents.
3. Split the text into smaller chunks.
4. Generate vector embeddings.
5. Store the embeddings in ChromaDB.
6. Retrieve relevant document chunks based on a question.
7. Send the retrieved context to an LLM.
8. Generate an answer grounded in the uploaded documents.

The application is implemented as a Streamlit web interface. The current application supports **PDF, DOCX, and TXT** uploads.

---

# 🧠 RAG Architecture

```text
                    User
                     │
                     ▼
            ┌─────────────────┐
            │ Streamlit UI    │
            │ Document Upload │
            │ Question Input  │
            └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │ Document Loader │
            └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │ Text Splitting  │
            │ & Chunking      │
            └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │ Embedding Model │
            └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │   ChromaDB      │
            │ Vector Database  │
            └────────┬────────┘
                     │
                     │ Similarity Search
                     ▼
            ┌─────────────────┐
            │ Relevant Context│
            └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │   Mistral AI    │
            │      LLM         │
            └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │   AI Answer     │
            └─────────────────┘
```

The implementation uses document loading, recursive text splitting, embeddings, Chroma vector storage, retrieval, and Mistral-based generation.

---

# ✨ Features

### 📄 Document Upload

Upload multiple supported documents through the Streamlit interface:

* PDF
* DOCX
* TXT

The main application uses Streamlit's multi-file uploader for these formats.

### 🔍 Retrieval-Augmented Generation

The system follows a RAG pipeline:

```text
Document
   ↓
Text Extraction
   ↓
Chunking
   ↓
Embeddings
   ↓
ChromaDB
   ↓
Similarity Retrieval
   ↓
Relevant Context
   ↓
Mistral AI
   ↓
Answer
```

### 🗄️ Vector Database

The project uses **ChromaDB** to store document embeddings and retrieve relevant document chunks.

The application also checks the local Chroma database and displays the current knowledge-base/chunk status in the Streamlit sidebar.

### 🤖 Mistral AI

Mistral AI is used as the language-model layer to generate responses based on retrieved document context.

The repository also contains a standalone Mistral API example using the `mistral-small-latest` model.

### 💬 Context-Aware Question Answering

Users can ask questions about the uploaded documents.

The RAG workflow retrieves relevant chunks before generating the final answer, helping keep responses grounded in the document content.

---

# 🛠️ Technology Stack

| Technology        | Purpose                          |
| ----------------- | -------------------------------- |
| **Python**        | Application development          |
| **Streamlit**     | Web interface                    |
| **LangChain**     | RAG pipeline and LLM integration |
| **Mistral AI**    | LLM / response generation        |
| **ChromaDB**      | Vector database                  |
| **Embeddings**    | Semantic document representation |
| **PyPDF**         | PDF processing                   |
| **python-docx**   | DOCX processing                  |
| **Unstructured**  | Document processing              |
| **Pandas**        | Data processing                  |
| **NumPy**         | Numerical operations             |
| **python-dotenv** | Environment configuration        |

These dependencies are defined in the repository's `requirements.txt`.

---

# 📂 Project Structure

```text
RAG_Gen_AI/
│
├── utils/
│   ├── document_loader.py
│   ├── vector_store.py
│   ├── rag_chain.py
│   └── helper.py
│
├── app.py
├── APP1.py
├── Doc.py
├── docloader.py
├── config.py
├── test.py
├── requirements.txt
├── .gitignore
└── README.md
```

### Important Components

**`app.py`**

Main Streamlit application responsible for:

* Application UI
* Document upload
* Vector database initialization
* RAG chain initialization
* Chat interaction
* Database status
* Chat/database controls

The application initializes `DocumentLoader`, `VectorStore`, and `RAGChain` components.

**`utils/document_loader.py`**

Responsible for document loading and processing.

**`utils/vector_store.py`**

Handles vector database functionality using ChromaDB.

**`utils/rag_chain.py`**

Contains the RAG/LLM processing workflow.

**`utils/helper.py`**

Contains application helper functions such as directory creation, uploaded-file handling, session-state initialization, database statistics, and supported-file handling.

---

# 🔄 RAG Pipeline Explained

## 1. Document Upload

The user uploads one or more documents through the Streamlit interface.

```text
PDF / DOCX / TXT
       ↓
Streamlit File Uploader
```

The current `app.py` accepts these three file types.

## 2. Document Loading

The uploaded documents are processed using the project's document-loader component.

## 3. Text Splitting

Large documents are divided into smaller chunks so they can be efficiently embedded and retrieved.

The repository's RAG implementation demonstrates recursive character splitting with a chunk size of **1000** and overlap of **200** in `Doc.py`.

## 4. Embedding Generation

Document chunks are converted into numerical vector representations.

These embeddings allow the system to perform semantic similarity search.

## 5. ChromaDB

The generated embeddings are stored in a persistent ChromaDB vector store.

```text
Document Chunk
      ↓
Embedding
      ↓
ChromaDB
```

## 6. Retrieval

When a user asks a question, the system retrieves the most relevant document chunks.

The example RAG implementation uses **MMR (Maximal Marginal Relevance)** retrieval with `k=4` and `fetch_k=10`.

## 7. LLM Generation

The retrieved context is passed to the Mistral AI model along with the user's question.

The model then generates the final response.

---

# 🧪 Example Workflow

Suppose the user uploads:

```text
Machine_Learning_Notes.pdf
```

Then asks:

```text
What is supervised learning?
```

The application performs:

```text
Question
   ↓
Embedding / Retrieval
   ↓
Search ChromaDB
   ↓
Retrieve relevant chunks
   ↓
Build context
   ↓
Send context + question to Mistral
   ↓
Generate answer
```

The response is therefore based on information retrieved from the uploaded document.

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/aniketambre01/RAG_Gen_AI.git
```

```bash
cd RAG_Gen_AI
```

## 2. Create Virtual Environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

The repository's dependency file includes Streamlit, Mistral AI, LangChain, LangChain Chroma integration, ChromaDB, document loaders, NumPy, Pandas, and related utilities.

---

# 🔑 Environment Variables

Create a `.env` file in the project root.

Example:

```env
MISTRAL_API_KEY=your_mistral_api_key
```

If using the embedding configuration that requires OpenAI, configure the corresponding API key as required by that implementation.

```env
OPENAI_API_KEY=your_openai_api_key
```

**Never commit API keys or other secrets to GitHub.**

---

# ▶️ Run the Application

Start the Streamlit application using:

```bash
streamlit run app.py
```

Streamlit will provide a local URL, typically:

```text
http://localhost:8501
```

The application opens with the title:

```text
📚 Chat with Your Documents
```

and provides document upload, vector-database creation, database status, and chat functionality.

---

# 🖥️ Application Workflow

```text
┌──────────────────────────────┐
│       Upload Documents       │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│   Create Vector Database     │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│      Process Documents       │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│       Store Embeddings       │
│          ChromaDB            │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│       Ask a Question         │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│       Retrieve Context       │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│         Mistral AI           │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│         AI Response          │
└──────────────────────────────┘
```
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/0f191e5a-eccb-45d0-a779-d336c3a41db8" />

---

# 📊 Key Concepts Demonstrated

This project demonstrates practical implementation of:

* Python application development
* Streamlit
* Retrieval-Augmented Generation
* Large Language Models
* Prompt Engineering
* Vector databases
* Semantic search
* Document processing
* Text chunking
* Embeddings
* LangChain
* Mistral AI API integration
* ChromaDB
* Context-aware question answering
* Environment-variable management

---

# 🎯 Learning Outcomes

Through this project, the following concepts are demonstrated:

### RAG

Understanding how retrieved external knowledge can be provided to an LLM before generating an answer.

### Vector Search

Understanding how document embeddings can be stored and searched semantically.

### Document Processing

Understanding how different document formats can be converted into text suitable for an AI pipeline.

### LLM Integration

Understanding how an application can combine retrieved context with an LLM to produce document-grounded responses.

### AI Application Development

Building an end-to-end AI application rather than only experimenting with an individual model.

---

# 🚧 Future Improvements

Potential enhancements include:

* FastAPI backend
* React/TypeScript frontend
* Qdrant vector database
* Authentication and authorization
* Streaming LLM responses
* Hybrid search
* Reranking
* Conversational memory
* Multi-document reasoning
* Support for additional file formats
* Docker deployment
* CI/CD
* Cloud deployment
* Automated testing
* Monitoring and logging

---

# 📌 Project Status

This repository represents the **Streamlit-based RAG implementation** of the project.

A separate full-stack development branch is also being developed with a Python/FastAPI backend and React/TypeScript frontend. The `main` branch should therefore be understood as the earlier/current Streamlit implementation rather than the full-stack version.

---

# 👨‍💻 Author

**Aniket Ambre**

Python Developer | GenAI Developer | AI Engineer

**GitHub:**
https://github.com/aniketambre01

**LinkedIn:**
https://www.linkedin.com/in/aniketambre/

---

# ⭐ Repository

[RAG_Gen_AI — GitHub Repository](https://github.com/aniketambre01/RAG_Gen_AI?utm_source=chatgpt.com)

If you find this project useful, consider giving it a ⭐.
