from fastapi import APIRouter, HTTPException

from app.services.decision_service import analyze_decision
from app.models.decision import DecisionRequest

router = APIRouter(
    prefix="/decision",
    tags=["Decision"]
)


@router.post("/")
def make_decision(request: DecisionRequest):

    try:
        result = analyze_decision(
            twin_profile=request.twin_profile,
            decision_request=request
        )

        return result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )