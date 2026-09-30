import json
from groq import Groq

from app.config import GROQ_API_KEY
from app.models.twin import TwinProfile
from app.models.decision import DecisionRequest, DecisionResponse


client = Groq(api_key=GROQ_API_KEY)


def analyze_decision(
    twin_profile: TwinProfile,
    decision_request: DecisionRequest
) -> DecisionResponse:

    profile = twin_profile.model_dump()

    prompt = f"""
You are Mirror Mind's Personal Decision Agent.

Your job is to help the user reason about THEIR CURRENT decision
using what Mirror Mind has learned about them.

==================================================
USER PROFILE
==================================================

Goals:
{json.dumps(profile.get("goals", []), indent=2)}

Priorities:
{json.dumps(profile.get("priorities", []), indent=2)}

Preferences:
{json.dumps(profile.get("preferences", []), indent=2)}

Routines:
{json.dumps(profile.get("routines", []), indent=2)}

Behavioral Patterns:
{json.dumps(profile.get("behavioral_patterns", []), indent=2)}

Past Decisions:
{json.dumps(profile.get("past_decisions", []), indent=2)}

Feedback History:
{json.dumps(profile.get("feedback_history", []), indent=2)}


==================================================
CURRENT USER DECISION
==================================================

Decision:
{decision_request.decision}

Options:
{json.dumps(decision_request.options, indent=2)}

Current Situation:
{decision_request.current_situation}


==================================================
REASONING RULES
==================================================

1. Analyze ONLY the CURRENT USER DECISION.

2. Do NOT assume the decision is about academics,
   projects, deadlines, programming, or any other topic
   unless the user explicitly says so.

3. The options above are the ONLY options being compared.

4. Use the user's Twin Profile to personalize the reasoning.

5. Only use profile information that is relevant to the
   current decision.

6. Do not invent facts about the user.

7. Identify the factors that actually matter for THIS decision.
   Do not use a fixed list of factors.

8. The factors must be dynamically determined from:
   - the current decision
   - the available options
   - the current situation
   - relevant information from the user's Twin Profile

9. Explain why each factor matters specifically for this user
   when the Twin Profile provides supporting information.

10. If the Twin Profile does not contain relevant information,
    do not pretend that it does. Base the reasoning on the
    current situation and clearly keep the reasoning general.

11. The recommendation must be one of the CURRENT OPTIONS.

12. Change triggers must be specific to THIS decision.

13. Do NOT mention or reuse example/default values from the UI.

14. Do NOT create factors such as "deadline", "project quality",
    "stress", or "remaining work" unless they are actually
    relevant to the CURRENT USER DECISION.

==================================================
DECISION DNA
==================================================

Identify the most important factors affecting the decision.

For each factor:
- give an importance value between 0 and 1
- explain why it matters

Then provide:

RECOMMENDATION:
Choose the option that best fits the user's profile and
current situation.

EXPLANATION:
Explain the reasoning clearly and specifically.

CHANGE TRIGGERS:
List concrete changes in the user's situation that could
cause the recommendation to change.

These triggers must be related to the CURRENT decision.

==================================================
OUTPUT
==================================================

Return ONLY valid JSON matching the DecisionResponse schema.

Do not include markdown.
Do not include additional fields.
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
            {
                "role": "system",
                "content": prompt
            }
        ],
        response_format={
            "type": "json_schema",
            "json_schema": {
                "name": "decision_response",
                "strict": False,
                "schema": DecisionResponse.model_json_schema()
            }
        }
    )

    result = json.loads(
        response.choices[0].message.content
    )

    return DecisionResponse.model_validate(result)