import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import PageNotFound from "./page/PageNotFound";
import { ConfigProvider, ThemeConfig } from "antd";

const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: "#997549",
  },
  components: {
    Menu: {
      activeBarBorderWidth: 0,
    },
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={themeConfig}>
        <Routes>
          <Route element={<App />}>
            <Route index element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
