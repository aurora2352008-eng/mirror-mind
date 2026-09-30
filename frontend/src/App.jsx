import { useState } from "react";

import Landing from "./pages/landing";
import Onboarding from "./pages/onboarding";
import TwinProfile from "./pages/TwinProfile";
import Decision from "./pages/Decision";
import DecisionDNA from "./pages/DecisionDNA";
import Feedback from "./pages/Feedback";

export default function App() {
  const [currentPage, setCurrentPage] = useState("landing");

  const [twinProfile, setTwinProfile] = useState(null);
  const [decisionResult, setDecisionResult] = useState(null);

  const navigate = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {

      case "onboarding":
        return (
          <Onboarding
            onComplete={(profile) => {
              setTwinProfile(profile);
              navigate("profile");
            }}
          />
        );

      case "profile":
        return (
          <TwinProfile
            profile={twinProfile}
            onContinue={() => navigate("decision")}
          />
        );

      case "decision":
        return (
          <Decision
            profile={twinProfile}
            onDecisionComplete={(result) => {
              setDecisionResult(result);
              navigate("dna");
            }}
          />
        );

      case "dna":
        return (
          <DecisionDNA
            result={decisionResult}
            onContinue={() => navigate("feedback")}
          />
        );

      case "feedback":
        return (
          <Feedback
            profile={twinProfile}
            decision={decisionResult}
            onComplete={() => navigate("profile")}
          />
        );

      case "landing":
      default:
        return (
          <Landing
            onStart={() => navigate("onboarding")}
            onNavigate={navigate}
          />
        );
    }
  };

  return (
    <div className="app">
      {renderPage()}
    </div>
  );
}