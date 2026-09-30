from pydantic import BaseModel
from typing import List

from app.models.twin import TwinProfile


class DecisionRequest(BaseModel):
    user_id: str
    decision: str
    options: List[str]
    current_situation: str
    twin_profile: TwinProfile


class DecisionFactor(BaseModel):
    name: str
    importance: float
    reason: str


class DecisionResponse(BaseModel):
    recommendation: str
    factors: List[DecisionFactor]
    explanation: str
    change_triggers: List[str]