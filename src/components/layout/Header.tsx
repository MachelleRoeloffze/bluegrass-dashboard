"use client";
import { useState } from "react";
import PopoverCard from "@/components/ui/PopoverCard";

export default function Header() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Registration",
      subtitle: "Alex Fredricks",
      date: "07 Oct 2022",
      avatar: "/avatar1.jpg",
    },
    {
      id: 2,
      title: "New Content Added",
      subtitle: "Blake Robertson",
      date: "07 Oct 2022",
      avatar: "/avatar2.jpg",
    },
  ]);

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

        <img className="avatar" src="/avatar.svg" alt="User" />
        <span className="user">Adrian Stefan</span>

        <PopoverCard
          position="bottom-left"
          variant="user"
          triggerContent={<i className="icon icon-note" />}
        >
          <div className="popover-user">
            <p className="popover-user__name">Adrian Stefan</p>
            <p className="popover-user__email">adrian@mrfertility.co.za</p>
            <button
              className="popover-user__action"
              onClick={() => (window.location.href = "/api/auth/logout")}
            >
              Logout
            </button>
          </div>
        </PopoverCard>
      </div>
    </header>
  );
}
