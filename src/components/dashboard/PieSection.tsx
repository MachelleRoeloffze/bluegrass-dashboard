import PieCard from "@/components/dashboard/PieCard";
import Card from "@/components/common/Card";

const data = [
  { percent: 24, statusText: "Pending", color: "#FF966B" },
  {
    percent: 56,
    statusText: "Registered",
    color: "#54D62C",
  },
  {
    percent: 20,
    statusText: "Post Treatment",
    color: "#1890FF",
  },
];

export default function PieSection() {
  return (
    <div className="pie-section">
      <Card>
        <div className="pie-section__content">
          {data.map((p, i) => (
            <div key={i} className="pie-section__item">
              <PieCard {...p} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
