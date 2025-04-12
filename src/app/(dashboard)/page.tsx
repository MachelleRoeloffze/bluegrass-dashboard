import StatSection from "@/components/dashboard/StatSection";
import PieSection from "@/components/dashboard/PieSection";
import PracticeSection from "@/components/dashboard/PracticeSection";

export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      <StatSection />
      <PieSection />
      <PracticeSection limit={4} />
    </div>
  );
}
