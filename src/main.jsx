import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import LaunchExperience from "./components/LaunchExperience/index.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <LaunchExperience />
    </BrowserRouter>
  </StrictMode>
);
