from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

from app.models.twin import TwinProfile
from app.services.gemini_service import extract_twin_profile


router = APIRouter(
    prefix="/onboarding",
    tags=["Onboarding"]
)


class OnboardingRequest(BaseModel):
    user_id: str
    conversation: List[str]


@router.post("/")
def process_onboarding(request: OnboardingRequest):

    twin = extract_twin_profile(
        user_id=request.user_id,
        conversation=request.conversation
    )

    return {
        "message": "Twin profile extracted successfully",
        "twin_profile": twin
    }