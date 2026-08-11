# 🤖 AI-Powered Document Intelligence Platform

A full-stack **AI document interaction platform** built with **Python, FastAPI, React, TypeScript, and RAG technologies**. The application is designed to provide a structured interface for document management and AI-powered interaction with uploaded content.

## 🚀 Project Overview

This project combines a **FastAPI backend** with a modern **React + TypeScript frontend** to create a foundation for an AI-powered document platform.

The backend provides API endpoints for authentication and document-related operations, while the frontend provides the user-facing application interface.

The project is being developed with a focus on:

* Retrieval-Augmented Generation (RAG)
* LLM-powered document interaction
* Vector search
* Document processing
* Secure API architecture
* Full-stack application development
* Scalable Python backend development

---

## 🏗️ Architecture

```text
                    ┌─────────────────────────┐
                    │       React Frontend    │
                    │   React + TypeScript    │
                    │      Vite + Tailwind    │
                    └────────────┬────────────┘
                                 │
                              REST API
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │      FastAPI Backend    │
                    │        Python           │
                    ├─────────────────────────┤
                    │ Authentication APIs     │
                    │ Document APIs           │
                    │ Application Services    │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │     Document Pipeline   │
                    │                         │
                    │ Document Processing     │
                    │ Text Extraction         │
                    │ Chunking                │
                    │ Embeddings              │
                    │ Vector Retrieval        │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │       Vector Store      │
                    │        Qdrant           │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │       LLM Layer         │
                    │ OpenAI / LLM APIs       │
                    └─────────────────────────┘
```

---

# ✨ Key Features

### 📄 Document Processing

* Upload and process documents through the application.
* Designed for document ingestion and text extraction.
* Supports a document-processing pipeline for downstream AI retrieval.

### 🔍 RAG-Based Retrieval

* Uses Retrieval-Augmented Generation architecture.
* Converts document content into searchable representations.
* Retrieves relevant information before generating an AI response.

### 🧠 LLM Integration

* Integration with LLM APIs for AI-powered responses.
* Designed to combine retrieved document context with LLM generation.

### 🔐 Authentication

* Backend contains dedicated authentication APIs.
* Authentication-related models and security components are included in the backend.

### ⚡ FastAPI Backend

* Python-based REST API using FastAPI.
* Modular API structure.
* Separate authentication and document routers.
* CORS configuration for frontend-backend communication.

### 💻 Modern Frontend

The frontend is built using:

* React
* TypeScript
* Vite
* React Router
* Zustand
* React Query
* Axios
* React Hook Form
* Zod
* React Dropzone
* React Markdown
* Tailwind CSS
* Lucide React

The current frontend dependency configuration confirms these technologies.

---

# 🛠️ Technology Stack

## Backend

| Technology            | Purpose                     |
| --------------------- | --------------------------- |
| Python                | Core backend language       |
| FastAPI               | REST API framework          |
| SQLAlchemy            | Database ORM                |
| Alembic               | Database migrations         |
| Pydantic              | Data validation             |
| Qdrant Client         | Vector database integration |
| LangChain             | LLM/RAG framework           |
| LangGraph             | AI workflow/orchestration   |
| OpenAI                | LLM/API integration         |
| Sentence Transformers | Embeddings                  |
| PyMuPDF / pypdf       | PDF processing              |
| python-docx           | DOCX processing             |
| OpenPyXL              | Excel processing            |
| pytest                | Testing                     |
| Uvicorn               | ASGI server                 |

The repository's backend requirements include FastAPI, LangChain, LangGraph, OpenAI, Qdrant, Sentence Transformers, SQLAlchemy, document-processing libraries, and Uvicorn.

## Frontend

| Technology      | Purpose                 |
| --------------- | ----------------------- |
| React           | UI                      |
| TypeScript      | Type-safe development   |
| Vite            | Frontend build tool     |
| Tailwind CSS    | Styling                 |
| Axios           | API communication       |
| React Query     | Server-state management |
| Zustand         | Client-state management |
| React Router    | Routing                 |
| React Hook Form | Form management         |
| Zod             | Validation              |
| React Dropzone  | File upload             |
| React Markdown  | Markdown rendering      |

---

# 📁 Project Structure

```text
RAG_Gen_AI/
│
├── backend/
│   ├── alembic/
│   ├── api/
│   │   └── v1/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── database/
│   │   └── ...
│   ├── uploads/
│   ├── requirements.txt
│   ├── alembic.ini
│   ├── .env.example
│   └── test_security.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── utils/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── README.md
│
└── README.md
```

The current branch contains dedicated `backend` and `frontend` directories, with backend API/application/database components and a React/TypeScript frontend.

---

# 🔧 Backend Setup

### 1. Clone the repository

```bash
git clone https://github.com/aniketambre01/RAG_Gen_AI.git

cd RAG_Gen_AI
```

### 2. Checkout the full-stack branch

```bash
git checkout feature/full-stack-ai-platform
```

### 3. Create a virtual environment

```bash
cd backend

python -m venv .venv
```

### Windows

```bash
.venv\Scripts\activate
```

### Linux / macOS

```bash
source .venv/bin/activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Configure environment variables

Create a `.env` file using `.env.example` as a reference.

Add the required configuration for:

```text
DATABASE_URL=
QDRANT_URL=
OPENAI_API_KEY=
```

> Do not commit API keys, passwords, or other secrets to GitHub.

### 6. Start the backend

```bash
uvicorn app.main:app --reload
```

The FastAPI application provides root and health endpoints, and registers authentication and document routers.

Backend:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

---

# 🎨 Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend package configuration provides Vite development, build, lint, and preview scripts.

Frontend:

```text
http://localhost:5173
```
<img width="1366" height="686" alt="frontend_Demo" src="https://github.com/user-attachments/assets/00420a8a-0a16-426d-b6fb-9eb216b03172" />

---

# 🔄 RAG Pipeline

The core AI workflow is designed around the following process:

```text
User Uploads Document
        │
        ▼
Document Loader
        │
        ▼
Text Extraction
        │
        ▼
Text Splitting / Chunking
        │
        ▼
Embedding Generation
        │
        ▼
Vector Database
     (Qdrant)
        │
        ▼
Similarity Search
        │
        ▼
Relevant Context
        │
        ▼
LLM
        │
        ▼
Context-Aware Response
```

This architecture allows the LLM to generate responses using information retrieved from the user's documents rather than relying only on its pretrained knowledge.

---

# 🧪 Testing

Backend tests can be executed using:

```bash
pytest
```

The repository currently includes a security test file under the backend directory.

---

# 🔒 Security

The project includes authentication and security-related backend components.

For local development:

* Store secrets in `.env`.
* Never commit API keys.
* Never expose database credentials.
* Use environment variables for deployment configuration.
* Review CORS settings before production deployment.

---

# 📌 Current Development Status

This project is actively being developed as a **full-stack AI platform**.

Current repository structure includes:

* Python/FastAPI backend
* React/TypeScript frontend
* Authentication APIs
* Document APIs
* RAG/LLM dependencies
* Qdrant integration
* Database layer
* Frontend state and API management
* Document-processing dependencies

The GitHub branch currently contains three commits and separate backend/frontend applications.

---

# 🎯 Future Enhancements

Planned improvements can include:

* Advanced hybrid search
* Reranking models
* Conversational memory
* Multi-document reasoning
* Agentic workflows
* Streaming LLM responses
* Role-based access control
* Improved document preview
* Background document processing
* Docker-based deployment
* CI/CD pipeline
* Cloud deployment
* Monitoring and logging

---

# 👨‍💻 Author

**Aniket Ambre**

Python Developer | GenAI Developer | AI Engineer

GitHub:
https://github.com/aniketambre01

LinkedIn:
https://www.linkedin.com/in/aniketambre/

---

# ⭐ Project

If you find this project useful or interesting, consider giving the repository a ⭐.

**Repository:**
https://github.com/aniketambre01/RAG_Gen_AI

**Branch:**
`feature/full-stack-ai-platform`
