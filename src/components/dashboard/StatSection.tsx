"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/dashboard/StatCard";
import { supabase } from "@/lib/supabaseClient";

export default function StatSection() {
  const [practiceCount, setPracticeCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchPracticeCount = async () => {
      const { count, error } = await supabase
        .from("practices")
        .select("*", { count: "exact", head: true });

      if (error) {
        console.error("Failed to load practices count", error);
        setPracticeCount(0);
      } else {
        setPracticeCount(count);
      }
    };

    fetchPracticeCount();
  }, []);

  const stats = [
    {
      title: "Total Practices",
      value: practiceCount ?? "–",
      growth: "15%",
      icon: "icon-stethoscope",
      growthIcon: "icon-up-arrow",
    },
    {
      title: "Total Subscribers",
      value: 261,
      growth: "15%",
      icon: "icon-pram",
      growthIcon: "icon-up-arrow",
    },
    {
      title: "Total Treatments",
      value: 135,
      growth: "15%",
      icon: "icon-plaster",
      growthIcon: "icon-up-arrow",
    },
    {
      title: "Total Consents",
      value: 135,
      growth: "15%",
      icon: "icon-note",
      growthIcon: "icon-up-arrow",
    },
    {
      title: "Total Consents signed",
      value: 2159,
      growth: "15%",
      icon: "icon-note",
      growthIcon: "icon-up-arrow",
    },
    {
      title: "Total Fact sheets read",
      value: 2159,
      growth: "15%",
      icon: "icon-idea",
      growthIcon: "icon-up-arrow",
    },
  ];

  return (
    <div className="stat-section">
      {stats.map((s, i) => (
        <StatCard
          key={i}
          title={s.title}
          value={s.value}
          growth={s.growth}
          icon={s.icon}
          growthIcon={s.growthIcon}
        />
      ))}
    </div>
  );
}
