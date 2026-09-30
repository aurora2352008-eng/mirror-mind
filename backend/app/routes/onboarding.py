from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

from app.models.twin import TwinProfile


router = APIRouter(
    prefix="/onboarding",
    tags=["Onboarding"]
)


class OnboardingRequest(BaseModel):
    user_id: str
    conversation: List[str]


@router.post("/")
def process_onboarding(request: OnboardingRequest):
    """
    Temporarily processes the onboarding conversation.

    The AI extraction layer will replace this mock logic later.
    """

    twin = TwinProfile(
        user_id=request.user_id,
        goals=[],
        priorities={},
        preferences={},
        routines={},
        behavioral_patterns=[],
        past_decisions=[],
        feedback_history=[]
    )

    return {
        "message": "Onboarding conversation received",
        "twin_profile": twin
    }