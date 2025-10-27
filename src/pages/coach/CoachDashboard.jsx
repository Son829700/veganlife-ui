import Overview from "../../components/admin/dashboard/Overview";
import ChartOverview from "../../components/admin/dashboard/ChartOverview";
import RecentActivity from "../../components/admin/dashboard/RecentActivity";
const CoachDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <Overview />
      <ChartOverview />
      <RecentActivity />
    </div>
  );
}
export default CoachDashboard;
