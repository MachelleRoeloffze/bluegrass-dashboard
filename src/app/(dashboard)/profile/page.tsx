import { getUser } from "@/lib/auth";

export default async function ProfilePage() {
  const user = await getUser();

  return (
    <div className="profile">
      <h1 className="profile__heading">My Profile</h1>

      <div className="profile__card">
        <div className="profile__info">
          <div className="profile__avatar">
            <img src={user?.picture || "/avatar.svg"} alt="Avatar" />
          </div>
          <div className="profile__details">
            <p className="profile__name">{user?.name || user?.email}</p>
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
            <p className="profile__stat-value">04/10/2021</p>
          </div>
        </div>
      </div>
    </div>
  );
}
