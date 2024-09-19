import React from "react";
import { IoEarthOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginInput from "../components/LoginInput";
import { asyncSetAuthUser } from "../states/authUser/action";
import ToggleTheme from "../components/ToggleTheme";
import { ThemeProvider } from "../contexts/ThemeContext";

function LoginPage() {
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
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };
  const themeContextValue = { theme, toggleTheme };
  return (
    <section className="login-page">
      <header className="login-page__hero">
        <h1>
          <IoEarthOutline />
        </h1>
      </header>
      <article className="login-page__main">
        <div className="logintheme">
          <ThemeProvider value={themeContextValue}>
            <ToggleTheme />
          </ThemeProvider>
        </div>
        <h2>
          See <strong>The World</strong>, <br />
          Through Threads.
        </h2>
        <LoginInput login={onLogin} />
        <p>
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </article>
    </section>
  );
}

export default LoginPage;
