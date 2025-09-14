import { useState, useEffect } from "react";
// import ScrollLink from '../components/Scrolls/ScrollLink';
import { NavLink } from 'react-router-dom';
import "../styles/components/navbar.css";


function LinkPill({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        "cast-nav__link" + (isActive ? " is-active" : "")
      }
    >
      {children}
    </NavLink>
  );
}

export default function NavBar() {
  const [open, setOpen] = useState(false);

  // Close the menu when route changes or on resize > breakpoint
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 900) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="cast-nav" role="navigation" aria-label="Primary">
      <div className="cast-nav__inner">
        {/* Brand */}
        <div className="cast-nav__brand">
          <span className="cast-brand__dot" />
          <span className="cast-brand__name">Cast</span>
        </div>

        {/* Desktop links */}
        <div className="cast-nav__links">
          <LinkPill to="/">Home</LinkPill>
          <LinkPill to="/mirror-lake">Mirror Lake</LinkPill>
          <LinkPill to="/species">Species</LinkPill>
          <LinkPill to="/gear">Gear</LinkPill>
          <LinkPill to="/techniques">Techniques</LinkPill>
          <LinkPill to="/environment">Environment</LinkPill>
          <LinkPill to="/locations-guide">Locations</LinkPill>
          <LinkPill to="/map">Map</LinkPill>
          <LinkPill to="/journal">Journal</LinkPill>
        </div>

        {/* Mobile toggle */}
        <button
          className={"cast-nav__toggle" + (open ? " is-open" : "")}
          aria-label="Toggle navigation menu"
          aria-expanded={open ? "true" : "false"}
          onClick={() => setOpen(v => !v)}
        >
          <span className="bar" /><span className="bar" /><span className="bar" />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={"cast-nav__drawer" + (open ? " is-open" : "")}>
        <LinkPill to="/">Home</LinkPill>
        <LinkPill to="/mirror-lake">Mirror Lake</LinkPill>
        <LinkPill to="/species">Species</LinkPill>
        <LinkPill to="/gear">Gear</LinkPill>
        <LinkPill to="/techniques">Techniques</LinkPill>
        <LinkPill to="/environment">Environment</LinkPill>
        <LinkPill to="/locations-guide">Locations</LinkPill>
        <LinkPill to="/map">Map</LinkPill>
        <LinkPill to="/journal">Journal</LinkPill>
      </div>
    </div>
  );
}