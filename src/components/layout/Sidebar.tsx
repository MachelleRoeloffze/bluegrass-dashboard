const links = [
  { label: "Dashboard", icon: "icon-home", href: "#" },
  { label: "My Profile", icon: "icon-user", href: "#" },
  { label: "Manage Practices", icon: "icon-medical", href: "#" },
  { label: "Logs", icon: "icon-file", href: "#" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <img src="/images/fertility-journey-logo.svg" alt="Logo" />
      </div>

      <nav className="sidebar__nav">
        {links.map((link, i) => (
          <a
            href={link.href}
            key={i}
            className={`sidebar__link${i === 0 ? " active" : ""}`}
          >
            <i className={link.icon}></i>
            <span>{link.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
