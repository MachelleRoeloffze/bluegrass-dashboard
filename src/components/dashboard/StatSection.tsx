"use client";
import { useEffect, useState } from "react";
import StatCard from "@/components/dashboard/StatCard";

export default function StatSection() {
  const [practiceCount, setPracticeCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/practices")
      .then((res) => res.json())
      .then((data) => setPracticeCount(data.length))
      .catch(() => setPracticeCount(0));
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
