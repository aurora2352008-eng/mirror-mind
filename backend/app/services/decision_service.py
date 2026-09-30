from google import genai

from app.config import GEMINI_API_KEY
from app.models.twin import TwinProfile
from app.models.decision import DecisionRequest, DecisionResponse


client = genai.Client(api_key=GEMINI_API_KEY)


def analyze_decision(
    twin_profile: TwinProfile,
    decision_request: DecisionRequest
) -> DecisionResponse:

    prompt = f"""
You are the Decision Agent of Mirror Mind,
an AI-powered academic decision twin.

Your job is to analyze a user's decision using:
1. The user's Twin Profile
2. The current decision
3. The available options
4. The current situation variables

Do NOT invent facts.
Use only information provided in the Twin Profile
and current decision context.

Your most important task is to produce Decision DNA.

Decision DNA must:
- identify the important factors affecting the decision
- assign each factor an importance value between 0 and 1
- explain why each factor matters
- provide a personalized recommendation
- explain the recommendation
- identify the variables or conditions that could cause
  the recommendation to change

The recommendation must depend on the current situation.
If a major variable changes, the recommendation should
be reconsidered.

USER TWIN PROFILE:
{twin_profile.model_dump_json()}

CURRENT DECISION:
{decision_request.model_dump_json()}

Return the result using the provided DecisionResponse schema.
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
        config={
            "response_mime_type": "application/json",
            "response_schema": DecisionResponse,
        },
    )

    return DecisionResponse.model_validate_json(response.text)