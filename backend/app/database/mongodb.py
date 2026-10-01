from pymongo import MongoClient
from app.config import MONGODB_URI

client = MongoClient(MONGODB_URI)

db = client["mirror_mind"]

twin_profiles = db["twin_profiles"]
decision_records = db["decision_records"]


def test_mongodb_connection():
    try:
        client.admin.command("ping")
        print("MongoDB connection successful!")
        return True
    except Exception as e:
        print("MongoDB connection failed:", e)
        return False