import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./components/loading";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import RegisterPage from "./pages/RegisterPage";
import DetailPage from "./pages/DetailPage";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { asyncUnsetAuthUser } from "./states/authUser/action";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);

  const dispatch = useDispatch(); // @TODO: get dispatch function from store

  React.useEffect(() => {
    // @TODO: dispatch async action to preload app
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    // @TODO: dispatch async action to sign out
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return <Loading />;
  }

  if (authUser === null) {
    return (
      <>
        <Loading />
        <main>
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <>
      <Loading />
      <div className="app-container">
        <header>
          <Navigation authUser={authUser} signOut={onSignOut} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/forums/:id" element={<DetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
