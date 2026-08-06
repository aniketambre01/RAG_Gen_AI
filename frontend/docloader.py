import os
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

import faulthandler
faulthandler.enable()

print("Importing VectorStore...")
from utils.vector_store import VectorStore

print("Creating VectorStore instance...")
vs = VectorStore()

print("SUCCESS — Chroma initialized fine.")
print("Document count:", vs.document_count())