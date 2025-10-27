import CommunitySection from "../../components/community/CommunitySection";
import GroupChallenges from "../../components/community/GroupChallenges";
import OurCommunity from "../../components/community/OurCommunity";
import CommunityFeatures from "../../components/community/CommunityFeatures";
import CommunityCTASection from "../../components/community/CommunityCTASection";
export default function CoachingPage() {
  return (
    <>
      <CommunitySection />
      <OurCommunity />
      {/* <GroupChallenges /> */}
      <CommunityFeatures  />
      <CommunityCTASection  />
    </>
  );
}
