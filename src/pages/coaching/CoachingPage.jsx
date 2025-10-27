import { useState } from "react";
import CoachingIntro from "../../components/coaching/CoachingIntro";
import CoachingList from "../../components/coaching/CoachingList";
import PlanSection from "../../components/coaching/PlanSection";


export default function CoachingPage() {
  const [selectedCoachId, setSelectedCoachId] = useState(null);

  const handleContinue = () => {
    setShowModal(true);
  };

  return (
    <>
      <CoachingIntro />
      <CoachingList
        selectedCoachId={selectedCoachId}
        setSelectedCoachId={setSelectedCoachId}
      />
      <PlanSection
        selectedCoachId={selectedCoachId}
        onContinue={handleContinue}
      />

    </>
  );
}
