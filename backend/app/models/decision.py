from pydantic import BaseModel
from typing import List, Dict


class DecisionRequest(BaseModel):
    user_id: str
    decision: str
    options: List[str]
    variables: Dict[str, str]


class DecisionFactor(BaseModel):
    name: str
    importance: float
    reason: str


class DecisionResponse(BaseModel):
    recommendation: str
    factors: List[DecisionFactor]
    explanation: str
    change_triggers: List[str]