"use client";
import PopoverCard from "@/components/ui/PopoverCard";

export default function Header() {
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
              You have 2 unread messages
            </p>

            <div className="popover-notifications__item">
              <img src="/avatar1.jpg" alt="User" className="avatar" />
              <div>
                <p className="title">New Registration</p>
                <p className="subtitle">Alex Fredricks</p>
                <p className="date">07 Oct 2022</p>
              </div>
              <i className="icon icon-trash" />
            </div>

            <div className="popover-notifications__item">
              <img src="/avatar2.jpg" alt="User" className="avatar" />
              <div>
                <p className="title">New Content Added</p>
                <p className="subtitle">Blake Robertson</p>
                <p className="date">07 Oct 2022</p>
              </div>
              <i className="icon icon-trash" />
            </div>

            <p className="popover-notifications__clear">Clear All</p>
          </div>
        </PopoverCard>

        <img className="avatar" src="/avatar.svg" alt="User" />
        <span className="user">Adrian Stefan</span>
        {/* User Dropdown Popover */}
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
