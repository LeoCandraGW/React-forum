import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

function Navigation({ authUser, signOut }) {
  const { id, name, avatar } = authUser;
  const location = useLocation()
  const [activeSection, setActiveSection] = React.useState(location.pathname);

  const handleNavClick = (path) => {
    setActiveSection(path);
  };

  const navLinks = [
    { path: "/", label: "Home"},
    { path: "/asd", label: "Page 1" },
    { path: "/asdas", label: "Page 2" },
    { path: "/asdw", label: "Page 3" },
    { path: "/asc", label: "Page 4" },
  ];

  return (
    <div className="navigation">
      <img src={avatar} alt={id} title={name} />

      {navLinks.map(({ path, label }) => (
        <Link key={path} to={path} onClick={() => handleNavClick(path)} className={activeSection === path ? 'active' : ''}>
          <nav>{label}</nav>
        </Link>
      ))}
      <button type="button" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
