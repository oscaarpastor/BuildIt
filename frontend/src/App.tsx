import { Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProjectsPage from "./pages/ProjectsPage";
import SettingsPage from "./pages/SettingsPage";
import ProjectPublicViewPage from "./pages/project/[id]/ProjectPublicViewPage";
import NewProjectPage from "./pages/NewProjectPage";
import EditProjectPage from "./pages/EditProjectPage";
import PrivateRoute from "./components/routes/PrivateRoute";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/project/:id/view" element={<ProjectPublicViewPage />} />

      <Route
        path="/projects"
        element={
          <PrivateRoute>
            <ProjectsPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/projects/new"
        element={
          <PrivateRoute>
            <NewProjectPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/projects/:id/edit"
        element={
          <PrivateRoute>
            <EditProjectPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <SettingsPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
