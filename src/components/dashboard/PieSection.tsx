import PieCard from "@/components/dashboard/PieCard";

const data = [
  { label: "Pending", percent: 24, color: "#f26522" },
  { label: "Registered", percent: 56, color: "#66cc66" },
  { label: "Post Treatment", percent: 20, color: "#3c8dbc" },
];

export default function PieSection() {
  return (
    <div className="pie-section">
      {data.map((p, i) => (
        <PieCard key={i} {...p} />
      ))}
    </div>
  );
}
