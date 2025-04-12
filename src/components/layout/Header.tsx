"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import PopoverCard from "@/components/ui/PopoverCard";

export default function Header() {
  const user = useUser();
  const [notifications, setNotifications] = useState<
    {
      id: number;
      title: string;
      subtitle: string;
      date: string;
      avatar: string;
    }[]
  >([]);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `http://localhost:3001/notifications?email=${encodeURIComponent(
          user.email
        )}`
      )
        .then((res) => res.json())
        .then(setNotifications)
        .catch(() => setNotifications([]));
    }
  }, [user]);

  const clearAll = () => setNotifications([]);
  const deleteNotification = (id: number) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <header className="header">
      <div className="actions">
        <PopoverCard
          position="bottom-right"
          variant="notifications"
          triggerContent={<i className="icon icon-user" />}
        >
          <div className="popover-notifications">
            <p className="popover-notifications__title">Notifications</p>
            <p className="popover-notifications__subtitle">
              {notifications.length
                ? `You have ${notifications.length} unread ${
                    notifications.length === 1 ? "message" : "messages"
                  }`
                : "No new notifications"}
            </p>

            {notifications.map((notif) => (
              <div key={notif.id} className="popover-notifications__item">
                <img src={notif.avatar} alt="User" className="avatar" />
                <div>
                  <p className="title">{notif.title}</p>
                  <p className="subtitle">{notif.subtitle}</p>
                  <p className="date">{notif.date}</p>
                </div>
                <i
                  className="icon icon-trash"
                  onClick={() => deleteNotification(notif.id)}
                />
              </div>
            ))}

            {notifications.length > 0 && (
              <p className="popover-notifications__clear" onClick={clearAll}>
                Clear All
              </p>
            )}
          </div>
        </PopoverCard>

        <img
          className="avatar"
          src={user?.picture || "/avatar.svg"}
          alt={user?.name}
        />
        <span className="user">{user?.name}</span>

        <PopoverCard
          position="bottom-left"
          variant="user"
          triggerContent={<i className="icon icon-note" />}
        >
          <div className="popover-user">
            <div className="popover-user__info">
              <p className="popover-user__name">{user?.name}</p>
              <p className="popover-user__email">{user?.email}</p>
            </div>

            <div className="popover-user__divider" />

            <div className="popover-user__actions">
              <button className="popover-user__action">Profile</button>
              <button
                className="popover-user__action"
                onClick={() => (window.location.href = "/api/auth/logout")}
              >
                Logout
              </button>
            </div>
          </div>
        </PopoverCard>
      </div>
    </header>
  );
}
