from pydantic import BaseModel, Field
from typing import List


class KeyValue(BaseModel):
    key: str
    value: str


class PastDecision(BaseModel):
    decision: str
    context: str = ""
    outcome: str = ""


class FeedbackEntry(BaseModel):
    decision: str
    feedback: str
    outcome: str


class TwinProfile(BaseModel):
    user_id: str

    goals: List[str] = Field(default_factory=list)

    priorities: List[KeyValue] = Field(default_factory=list)

    preferences: List[KeyValue] = Field(default_factory=list)

    routines: List[KeyValue] = Field(default_factory=list)

    behavioral_patterns: List[KeyValue] = Field(default_factory=list)
    past_decisions: List[PastDecision] = Field(default_factory=list)

    feedback_history: List[FeedbackEntry] = Field(default_factory=list)