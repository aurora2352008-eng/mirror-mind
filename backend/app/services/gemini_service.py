import json

from groq import Groq

from app.config import GROQ_API_KEY
from app.models.twin import TwinProfile


client = Groq(api_key=GROQ_API_KEY)


def extract_twin_profile(
    user_id: str,
    conversation: list[str]
) -> TwinProfile:

    conversation_text = "\n".join(
        f"User message {index + 1}: {message}"
        for index, message in enumerate(conversation)
    )

    prompt = f"""
You are the profile-learning engine of Mirror Mind.

Mirror Mind creates a personal digital twin that learns from
information explicitly provided by the user.

You MUST analyze the ENTIRE conversation below.

Do NOT ignore earlier messages.

Extract only information directly supported by the user's words.
Never invent information.

IMPORTANT EXTRACTION RULES:

1. GOALS
Extract every clear long-term or short-term goal.

2. PRIORITIES
Extract things the user considers important, especially statements
such as:
- "I prioritize..."
- "X is important to me"
- "I care more about X than Y"
- "My priority is..."
- "I want to focus on..."

For priorities, use the key as a short description and the value
as the user's stated importance or preference.

Example:
{{"key": "academic performance", "value": "high priority"}}

3. PREFERENCES
Extract things the user prefers, likes, dislikes, or chooses.

4. ROUTINES
Extract repeated habits, schedules, study patterns, or regular behavior.

5. BEHAVIORAL PATTERNS
Extract patterns explicitly described by the user, especially
patterns involving how they make decisions or behave.

6. PAST DECISIONS
This is VERY IMPORTANT.

Extract EVERY past decision that the user explicitly describes.

A past decision should contain:
- decision: what the user decided
- context: why / situation surrounding the decision
- outcome: what happened afterward

If the user describes multiple past decisions, create multiple
past_decisions entries.

DO NOT leave past_decisions empty if the conversation contains
a clear previous decision.

If the user only describes a past event without a decision,
do not treat it as a past decision.

7. FEEDBACK HISTORY
Extract explicit feedback about previous decisions.

Do not invent feedback.

8. DO NOT DUPLICATE INFORMATION unnecessarily.

9. DO NOT diagnose personality traits.

10. DO NOT make assumptions.

USER ID:
{user_id}

FULL USER CONVERSATION:
{conversation_text}

Return ONLY a valid JSON object.

The JSON MUST have exactly these top-level fields:

{{
  "user_id": "{user_id}",
  "goals": [],
  "priorities": [],
  "preferences": [],
  "routines": [],
  "behavioral_patterns": [],
  "past_decisions": [],
  "feedback_history": []
}}

The expected structures are:

priorities:
[
  {{
    "key": "short description",
    "value": "importance/value"
  }}
]

preferences:
[
  {{
    "key": "short description",
    "value": "preference"
  }}
]

routines:
[
  {{
    "key": "short description",
    "value": "routine"
  }}
]

past_decisions:
[
  {{
    "decision": "what the user decided",
    "context": "situation surrounding the decision",
    "outcome": "what happened afterward"
  }}
]

feedback_history:
[
  {{
    "decision": "related decision",
    "feedback": "user feedback",
    "outcome": "result"
  }}
]

Return valid JSON only.
"""


    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        response_format={
            "type": "json_object"
        },
        reasoning_effort="low",
        reasoning_format="hidden"
    )


    content = response.choices[0].message.content

    if not content:
        raise ValueError("Groq returned an empty response.")

    try:
        result = json.loads(content)
    except json.JSONDecodeError as error:
        raise ValueError(
            f"Groq returned invalid JSON: {content}"
        ) from error


    # Make sure missing fields never break the TwinProfile.
    result.setdefault("user_id", user_id)
    result.setdefault("goals", [])
    result.setdefault("priorities", [])
    result.setdefault("preferences", [])
    result.setdefault("routines", [])
    result.setdefault("behavioral_patterns", [])
    result.setdefault("past_decisions", [])
    result.setdefault("feedback_history", [])

# Convert behavioral pattern objects into strings
    if isinstance(result["behavioral_patterns"], list):
        result["behavioral_patterns"] = [
            (
                f"{item.get('key')}: {item.get('value')}"
                if isinstance(item, dict)
                else str(item)
            )
            for item in result["behavioral_patterns"]
        ]

    return TwinProfile.model_validate(result)