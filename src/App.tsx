import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { ProtectedRoute, PublicRoute } from "./components/auth-redirect";
import { TasksPage } from "./pages/Tasks";
import { useAuth } from "./shared/context/auth";
import { UpdateTask } from "./pages/UpdateTask";
import { RegisterTask } from "./pages/RegisterTask";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          element={
            <PublicRoute
              isAuthenticated={isAuthenticated}
              redirectTo="/tasks"
            />
          }
        >
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              redirectTo="/login"
            />
          }
        >
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/register-task" element={<RegisterTask />} />
          <Route path="/update-task" element={<UpdateTask />} />
        </Route>

        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to="/tasks" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
