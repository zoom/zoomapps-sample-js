import React from "react";
import { render } from "react-dom";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import "./styles/styles.css";

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
