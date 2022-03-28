import React from "react";
import "./App.scss";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import PasswordStrengthChecker from "./pages/password-strength-checker";
import NotFound from "./pages/errors/not-found";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/password-strength-checker" />} />
        <Route path="/password-strength-checker" element={<PasswordStrengthChecker />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
