import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import NotFoundPage from "./page/NotFoundPage";
import { ConfigProvider, ThemeConfig } from "antd";
import { UserProvider } from "./components/UserProvider";

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
      <UserProvider>
        <ConfigProvider theme={themeConfig}>
          <Routes>
            <Route element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </ConfigProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
