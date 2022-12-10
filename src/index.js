import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import TodoApp from "./component/TodoApp";

import "./style/style.css";
import "./style/app.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <TodoApp />
  </BrowserRouter>
);
