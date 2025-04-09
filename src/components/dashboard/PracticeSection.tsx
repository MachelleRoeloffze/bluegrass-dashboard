import PracticeRow from "@/components/dashboard/PracticeRow";
import Card from "@/components/common/Card";

type Practice = {
  name: string;
  phone: string;
  email: string;
  date: string;
  status: "Active" | "Disabled";
};

const practices: Practice[] = [
  {
    name: "Cape Fertility Clinic",
    phone: "+27 794 3956",
    email: "info@capefertility.co.za",
    date: "04/10/2023",
    status: "Active",
  },
  {
    name: "Another Practice",
    phone: "+27 123 4567",
    email: "hello@example.com",
    date: "03/22/2023",
    status: "Disabled",
  },
];

export default function PracticeSection() {
  return (
    <Card>
      <div className="practice-section">
        <h3>Newest Practices</h3>
        <div className="practice-header">
          <span>Practice Name</span>
          <span>Tel No</span>
          <span>Email</span>
          <span>Date Created</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {practices.map((p, i) => (
          <PracticeRow key={i} {...p} />
        ))}
      </div>
    </Card>
  );
}
