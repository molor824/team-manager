import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoPage from "./page/TodoPage";
import HomePage from "./page/HomePage";
import NotFoundPage from "./page/NotFoundPage";
import SignUpPage from "./page/SignUpPage";
import LogInPage from "./page/LogInPage";
import EditProfilePage from "./page/EditProfilePage";
import { ConfigProvider, ThemeConfig } from "antd";
import { UserProvider } from "./components/UserProvider";
import ProjectsPage from "./page/ProjectsPage.tsx";
import ProjectPage from "./page/ProjectPage.tsx";
import ProjectTasksPage from "./page/ProjectTasksPage.tsx";

export const API_URL = "http://localhost:8080/api";

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
              <Route path="signup" element={<SignUpPage />} />
              <Route path="login" element={<LogInPage />} />
              <Route path="todo" element={<TodoPage />} />
              <Route path="edit-profile" element={<EditProfilePage />} />
              <Route path="projects">
                <Route path=":projectId" element={<ProjectPage />} />
                <Route path="" element={<ProjectsPage />} />
              </Route>
              <Route path="task" element={<ProjectTasksPage/>} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </ConfigProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
