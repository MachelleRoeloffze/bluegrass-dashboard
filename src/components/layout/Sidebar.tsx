const links = [
  { label: "Dashboard", href: "#" },
  { label: "Practices", href: "#" },
  { label: "Reports", href: "#" },
  { label: "Settings", href: "#" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">DashX</div>
      <nav className="sidebar__nav">
        {links.map((link, i) => (
          <a href={link.href} key={i} className="sidebar__link">
            {link.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
