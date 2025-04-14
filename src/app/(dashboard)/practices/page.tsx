"use client";

import SectionHeading from "@/components/common/SectionHeading";
import PracticeSection from "@/components/dashboard/PracticeSection";

export default function PracticesPage() {
  return (
    <div className="practices-page">
      <SectionHeading title="All Practices" />
      <PracticeSection />
    </div>
  );
}
