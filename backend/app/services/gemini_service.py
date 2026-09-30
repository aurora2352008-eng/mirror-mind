from google import genai

from app.config import GEMINI_API_KEY
from app.models.twin import TwinProfile


client = genai.Client(api_key=GEMINI_API_KEY)


def extract_twin_profile(user_id: str, conversation: list[str]) -> TwinProfile:

    conversation_text = "\n".join(
        f"User: {message}"
        for message in conversation
    )

    prompt = f"""
You are the profile extraction component of Mirror Mind,
an AI-powered academic decision twin.

Your task is to extract ONLY information that is supported
by the user's conversation.

Do not invent facts.
Do not make assumptions about the user.
Do not diagnose personality traits.
If information is not available, leave the corresponding
field empty.

Extract:

- goals
- priorities
- preferences
- routines
- behavioral_patterns
- past_decisions
- feedback_history

User ID:
{user_id}

Conversation:
{conversation_text}

Return the information using the provided TwinProfile schema.
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
        config={
            "response_mime_type": "application/json",
            "response_schema": TwinProfile,
        },
    )

    return TwinProfile.model_validate_json(response.text)