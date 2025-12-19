import React from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
