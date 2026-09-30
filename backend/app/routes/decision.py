from fastapi import APIRouter, HTTPException

from app.models.decision import DecisionRequest
from app.services.decision_service import analyze_decision


router = APIRouter(
    prefix="/decision",
    tags=["Decision"]
)


@router.post("/")
def make_decision(request: DecisionRequest):

    try:
        # For now we use a simple Twin Profile.
        # Later this will be loaded from the database.
        from app.models.twin import TwinProfile

        twin_profile = TwinProfile(
            user_id=request.user_id,
            goals=[],
            priorities=[],
            preferences=[],
            routines=[],
            behavioral_patterns=[],
            past_decisions=[],
            feedback_history=[]
        )

        result = analyze_decision(
            twin_profile=twin_profile,
            decision_request=request
        )

        return result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )