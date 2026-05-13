import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";

import { ThemeProvider }
  from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);