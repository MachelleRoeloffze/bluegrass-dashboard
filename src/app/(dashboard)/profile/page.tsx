import SectionHeading from "@/components/common/SectionHeading";
import { getUser } from "@/lib/auth";

function getInitials(nameOrEmail: string) {
  return nameOrEmail
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default async function ProfilePage() {
  const user = await getUser();

  const fullName =
    user?.user_metadata?.name ||
    user?.user_metadata?.full_name ||
    user?.email ||
    "User";

  const initials = getInitials(fullName);

  return (
    <div className="profile">
      <SectionHeading title="My Profile" />

      <div className="profile__card">
        <div className="profile__info">
          <div className="profile__avatar avatar avatar--initials">
            {initials}
          </div>
          <div className="profile__details">
            <p className="profile__name">{fullName}</p>
            <p className="profile__email">{user?.email}</p>
          </div>
        </div>

        <div className="profile__stats">
          <div className="profile__stat">
            <p className="profile__stat-label">Role</p>
            <p className="profile__stat-value">Admin</p>
          </div>
          <div className="profile__stat">
            <p className="profile__stat-label">Status</p>
            <p className="profile__stat-value">Active</p>
          </div>
          <div className="profile__stat">
            <p className="profile__stat-label">Joined</p>
            <p className="profile__stat-value">
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
