"""
rag_chain.py

Retrieval-Augmented Generation (RAG) pipeline using:
- ChromaDB
- Mistral Embeddings
- Mistral Chat API
"""

import os

from dotenv import load_dotenv
from mistralai.client import Mistral


load_dotenv()


class RAGChain:
    def __init__(self, vector_store):

        api_key = os.getenv("MISTRAL_API_KEY")

        if not api_key:
            raise ValueError("MISTRAL_API_KEY not found in .env")

        self.client = Mistral(api_key=api_key)

        self.chat_model = os.getenv(
            "CHAT_MODEL",
            "mistral-small-latest"
        )

        self.top_k = int(os.getenv("TOP_K", 5))

        self.vector_store = vector_store

    def retrieve_documents(self, question):
        """
        Retrieve relevant document chunks.
        """

        return self.vector_store.similarity_search(
            query=question,
            k=self.top_k
        )

    def build_context(self, documents):
        """
        Combine retrieved chunks into one context string.
        """

        context = ""

        for i, doc in enumerate(documents, start=1):

            source = doc.metadata.get("source", "Unknown")

            page = doc.metadata.get("page", "-")

            context += f"""
==========================
Document {i}

Source : {source}
Page   : {page}

Content:
{doc.page_content}

"""

        return context

    def build_prompt(self, context, question):
        """
        Build the final prompt for the LLM.
        """

        return f"""
You are a helpful AI assistant.

Answer ONLY using the provided context.

If the answer is not present in the context, reply exactly:

"I couldn't find that information in the uploaded documents."

--------------------------
CONTEXT
--------------------------

{context}

--------------------------
QUESTION
--------------------------

{question}

--------------------------
ANSWER
--------------------------
"""

    def ask(self, question):
        """
        Main RAG pipeline.
        """

        documents = self.retrieve_documents(question)

        if len(documents) == 0:
            return {
                "answer": "No documents found in the vector database.",
                "sources": []
            }

        context = self.build_context(documents)

        prompt = self.build_prompt(
            context=context,
            question=question
        )

        response = self.client.chat.complete(
            model=self.chat_model,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2,
        )

        answer = response.choices[0].message.content

        return {
            "answer": answer,
            "sources": documents
        }