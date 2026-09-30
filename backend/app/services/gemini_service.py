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
        f"User: {message}" for message in conversation
    )

    prompt = f"""
You are the learning and profile extraction component of
Mirror Mind.

Mirror Mind is a personal academic decision twin.

Your job is to learn from EVERYTHING the user explicitly
communicates in the conversation.

Do not only look for sentences containing keywords.
Understand the meaning of each user input.

IMPORTANT RULES:

1. Extract information explicitly supported by the user.
2. Do NOT invent facts.
3. Do NOT diagnose personality traits.
4. Do NOT assume information that the user did not provide.
5. Preserve useful information from EVERY user message.
6. Do not throw away useful information just because it does
   not fit perfectly into one category.
7. Avoid duplicate entries.

--------------------------------------------------
GOALS
--------------------------------------------------

Extract explicit goals.

Examples:

"My goal is to improve my academic performance."

"My goal is to become industry ready."

Store these in "goals".

--------------------------------------------------
PRIORITIES
--------------------------------------------------

Extract things the user explicitly considers important.

Examples:

"My priorities are academics, projects and learning."

"I prioritize quality over speed."

"When making decisions, I consider deadline and stress."

Store each distinct priority as a KeyValue object.

Example:

{{
  "key": "academics",
  "value": "high priority"
}}

Extract ALL explicitly stated priorities.

--------------------------------------------------
PREFERENCES
--------------------------------------------------

Extract explicit preferences.

Examples:

"I prefer practical learning."

"I prefer Python."

"I prefer starting projects early."

Store them as KeyValue objects.

--------------------------------------------------
ROUTINES
--------------------------------------------------

Extract recurring habits or routines explicitly described
by the user.

Examples:

"I usually study at night."

"I normally make a plan before starting a project."

Store them as KeyValue objects.

--------------------------------------------------
BEHAVIORAL PATTERNS
--------------------------------------------------

Extract patterns in the user's behavior that are explicitly
described.

Example:

"I sometimes delay project work and then experience more
stress near the deadline."

Store this as a behavioral pattern.

Do not diagnose personality.

--------------------------------------------------
PAST DECISIONS
--------------------------------------------------

This is VERY IMPORTANT.

Extract and COUNT genuine past decisions.

A past decision is a specific choice or action that the user
actually made in the past.

Every DISTINCT past decision must create EXACTLY ONE object
inside "past_decisions".

Examples:

"I delayed my project because I thought I had enough time."

This is ONE past decision:

{{
  "decision": "Delayed the project",
  "context": "Thought there was enough time",
  "outcome": ""
}}

Example:

"I chose to submit my project early because I had an exam
the next day."

This is ONE past decision:

{{
  "decision": "Submitted the project early",
  "context": "Had an exam the next day",
  "outcome": ""
}}

Example:

"I submitted my project early and the quality was slightly
lower."

This is ONE past decision:

{{
  "decision": "Submitted the project early",
  "context": "",
  "outcome": "Quality was slightly lower"
}}

COUNTING RULES:

- One distinct past decision = one item.
- Never duplicate the same decision.
- Never create an empty decision.
- Every object MUST have a non-empty "decision".
- If context is unknown, use "".
- If outcome is unknown, use "".
- Never invent an outcome.
- Never invent a decision.
- If there are no genuine past decisions, return [].

DO NOT count these as past decisions:

- Goals
- Priorities
- Preferences
- Routines
- Future intentions
- General behavioral patterns

However, if a behavioral statement contains a SPECIFIC
past action, that specific action IS a past decision.

Example:

"I sometimes delay projects."

Past decisions = 0

But:

"I delayed my last project because I thought I had enough
time."

Past decisions = 1

--------------------------------------------------
LEARN FROM EVERY INPUT
--------------------------------------------------

Review every user message in the conversation.

If one message contains multiple different pieces of useful
information, extract all of them.

For example:

"I chose to start projects earlier because last-minute work
caused stress, and I prefer practical learning."

Extract:

1. Past decision:
   "Started projects earlier"

2. Behavioral pattern:
   "Last-minute work caused stress"

3. Preference:
   "Practical learning"

Do not force all information into one category.

--------------------------------------------------
FEEDBACK HISTORY
--------------------------------------------------

Extract feedback only when the user explicitly describes the
result or outcome of a previous decision.

Example:

"I submitted early and realized that reducing last-minute
stress was more useful to me than having perfect quality."

This can be recorded as feedback.

Do not invent feedback.

--------------------------------------------------
CONVERSATION
--------------------------------------------------

{conversation_text}

--------------------------------------------------
FINAL CHECK
--------------------------------------------------

Before returning the JSON:

1. Check EVERY user message.
2. Extract every useful explicitly stated fact.
3. Extract ALL explicit goals.
4. Extract ALL explicit priorities.
5. Extract ALL explicit preferences.
6. Extract ALL explicit routines.
7. Extract ALL explicit behavioral patterns.
8. Extract ALL genuine distinct past decisions.
9. Count each past decision exactly once.
10. Do not create duplicate past decisions.
11. Do not create empty past decisions.
12. Do not invent information.

IMPORTANT:

The number of objects in "past_decisions" MUST equal the
number of distinct genuine past decisions found in the
conversation.

If there are 3 genuine past decisions, return 3 objects.

If there are 0 genuine past decisions, return [].

Return ONLY valid JSON matching the TwinProfile schema.

User ID:
{user_id}
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        temperature=0,
        messages=[
            {
                "role": "system",
                "content": prompt
            }
        ],
        response_format={
            "type": "json_schema",
            "json_schema": {
                "name": "twin_profile",
                "strict": False,
                "schema": TwinProfile.model_json_schema()
            }
        }
    )

    result = json.loads(
        response.choices[0].message.content
    )

    return TwinProfile.model_validate(result)