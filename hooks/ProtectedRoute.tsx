import { Redirect } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "./authContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useContext(AuthContext);

  // Show nothing until Firebase confirms user status
  if (loading) return null;

  // If no user, redirect to the login page.
  if (!user) {
    return <Redirect href="/login" />;
  }

  // If the system detects the user is logged in, redirect to the main page.
  return children;
}
