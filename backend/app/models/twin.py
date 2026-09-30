from pydantic import BaseModel, Field
from typing import List, Dict


class TwinProfile(BaseModel):
    user_id: str

    goals: List[str] = Field(default_factory=list)

    priorities: Dict[str, str] = Field(default_factory=dict)

    preferences: Dict[str, str] = Field(default_factory=dict)

    routines: Dict[str, str] = Field(default_factory=dict)

    behavioral_patterns: List[str] = Field(default_factory=list)

    past_decisions: List[Dict] = Field(default_factory=list)

    feedback_history: List[Dict] = Field(default_factory=list)