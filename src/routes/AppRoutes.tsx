import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import Dashboard from "../pages/Dashboard";

// Temporary Pages
const Login = () => <h2>Login Page</h2>;
const Register = () => <h2>Register Page</h2>;
import Projects from "../pages/Projects";
import Upload from "../pages/Upload";
const Chat = () => <h2>Chat Page</h2>;
const Settings = () => <h2>Settings Page</h2>;
const NotFound = () => <h2>404 - Page Not Found</h2>;

const AppRoutes = () => {
  /*
      Later this will come from
      Zustand / Context / JWT
  */

  const isAuthenticated = true;

  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route
          element={
            <PublicRoute
              isAuthenticated={isAuthenticated}
            />
          }
        >
          <Route element={<AuthLayout />}>
            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />
          </Route>
        </Route>

        {/* Protected Routes */}

        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
            />
          }
        >
          <Route element={<DashboardLayout />}>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/projects"
              element={<Projects />}
            />

            <Route
              path="/upload"
              element={<Upload />}
            />

            <Route
              path="/chat"
              element={<Chat />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

          </Route>
        </Route>

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;