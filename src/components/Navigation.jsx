import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import { ThemeProvider } from "../contexts/ThemeContext";

function Navigation({ authUser, signOut }) {
  const { id, name, avatar } = authUser;
  const location = useLocation();
  const [activeSection, setActiveSection] = React.useState(location.pathname);
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleNavClick = (path) => {
    setActiveSection(path);
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/asd", label: "Page 1" },
    { path: "/asdas", label: "Page 2" },
    { path: "/asdw", label: "Page 3" },
    { path: "/asc", label: "Page 4" },
  ];

  const themeContextValue = { theme, toggleTheme };
  return (
    <div className="navigation">
      <div className="nav-image">
        <img src={avatar} alt={id} title={name} />
      </div>

      {navLinks.map(({ path, label }) => (
        <div className="talk-item">
          <span></span>
          <span></span>
          <span></span>
          <Link
            key={path}
            to={path}
            onClick={() => handleNavClick(path)}
            className={activeSection === path ? "active" : ""}
          >
            <nav>{label}</nav>
          </Link>
        </div>
      ))}
      <div className="button-style">
        <div className="theme-button">
          <ThemeProvider value={themeContextValue}>
            <ToggleTheme />
          </ThemeProvider>
        </div>
        <div className="signout-button">
          <button type="button" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </div>
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
