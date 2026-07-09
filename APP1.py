from mistralai.client import Mistral
from config import MISTRAL_API_KEY

# Create client
client = Mistral(api_key=MISTRAL_API_KEY)

response = client.chat.complete(
    model="mistral-small-latest",
    messages=[
        {
            "role": "user",
            "content": "Explain Machine Learning in simple words."
        }
    ]
)

print(response.choices[0].message.content)