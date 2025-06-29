import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./pages/Login";
import AccentureAnalytics from "./pages/Analytics";
import { Fragment } from "react";
import { Route, Router, Routes } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/analytics" element={<AccentureAnalytics />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Fragment>
  )
}

export default App;
