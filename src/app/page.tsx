import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import StatSection from "@/components/dashboard/StatSection";
import PieSection from "@/components/dashboard/PieSection";
import PracticeSection from "@/components/dashboard/PracticeSection";

export default function DashboardPage() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-area">
        <Header />
        <main className="dashboard-content">
          {/* <p>Welcome Andrew!</p>{" "}
          <p>
            Nulla ut aliquam metus. Integer at diam sem. Nunc finibus nibh vel
            risus eleifend laoreet. Link
          </p> */}
          <div className="dashboard-page">
            <StatSection />
            <PieSection />
            <PracticeSection />
          </div>
        </main>
      </div>
    </div>
  );
}
