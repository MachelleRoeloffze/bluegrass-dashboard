"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useUser } from "@/context/UserContext";
import PopoverCard from "@/components/ui/PopoverCard";
import Link from "next/link";

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
      const fetchNotifications = async () => {
        const { data, error } = await supabase
          .from("notifications")
          .select("*")
          .eq("email", user.email);

        if (error) {
          console.error("Error fetching notifications:", error.message);
          setNotifications([]);
          return;
        }

        setNotifications(data);
      };

      fetchNotifications();
    }
  }, [user]);

  const clearAll = () => setNotifications([]);
  const deleteNotification = (id: number) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  const fullName =
    user?.user_metadata?.name ||
    user?.user_metadata?.full_name ||
    user?.email ||
    "User";
  const profilePic = user?.user_metadata?.picture || "/avatar.svg";

  return (
    <header className="header">
      <div className="actions">
        <PopoverCard
          position="bottom-right"
          variant="notifications"
          triggerContent={
            <div className="popover__trigger">
              <i className="icon icon-bell" />
              {notifications.length > 0 && (
                <span className="popover__badge">
                  {notifications.length > 9 ? "" : notifications.length}
                </span>
              )}
            </div>
          }
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
                  <p className="date">
                    <i className="icon icon-clock"></i>
                    {notif.date}
                  </p>
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

        <img className="avatar" src={profilePic} alt={fullName} />
        <span className="user">{fullName}</span>

        <PopoverCard
          position="bottom-left"
          variant="user"
          triggerContent={<i className="icon icon-right" />}
        >
          <div className="popover-user">
            <div className="popover-user__info">
              <p className="popover-user__name">{fullName}</p>
              <p className="popover-user__email">{user?.email}</p>
            </div>

            <div className="popover-user__divider" />

            <div className="popover-user__actions">
              <Link href="/profile" className="popover-user__action">
                Profile
              </Link>

              <a href="/logout" className="popover-user__action">
                Logout
              </a>
            </div>
          </div>
        </PopoverCard>
      </div>
    </header>
  );
}
