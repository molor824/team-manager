import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import PageNotFound from "./page/PageNotFound";
// import Todo from "./page/Todo"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
          {/* <Route index element={<Todo />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
