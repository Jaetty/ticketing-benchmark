// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './index.css'; // tailwind 적용

import App from "./App";
import Header from "./components/Common/Header/Header";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header/>
      <div className="pt-6"> {/* 64px == 16 * 4px */}
        <App />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
