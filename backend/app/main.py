from fastapi import FastAPI
from app.routes.onboarding import router as onboarding_router
from app.routes.decision import router as decision_router

app = FastAPI(
    title="Mirror Mind API",
    description="AI-powered academic decision twin.",
    version="1.0.0"
)
app.include_router(onboarding_router)
app.include_router(decision_router)


@app.get("/")
def root():
    return {
        "message": "Mirror Mind API is running",
        "status": "ok"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }