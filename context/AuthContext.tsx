"use client";
import { userData } from "@/components/pages/Profile";
import getUser from "@/utils/getUser";
import logoutUser from "@/utils/logout";
import React, { createContext, useContext, useEffect, useState } from "react";
type AuthState = {
  user: userData | null;
  isLoggedIn: boolean;
};

const initialAuthState = {
  user: null,
  isLoggedIn: false,
};

const AuthContext = createContext<{
  authState: AuthState;
  login: (user: userData) => void;
  logout: () => void;
}>({
  authState: initialAuthState,
  login: () => {},
  logout: () => {},
});
// Create a provider component
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);
  const login = (user: userData) => {
    setAuthState({ isLoggedIn: true, user: user });
    // Add logic for actual authentication
  };

  const logout = async () => {
    setAuthState({ isLoggedIn: false, user: null });
    await logoutUser();
  };

  async function updateUser() {
    const userSession = sessionStorage.getItem("tweehub_user");
    if (userSession) {
      const userData_from_session = JSON.parse(userSession);
      login(userData_from_session);
      return;
    }
    const user = await getUser();
    if (user) {
      sessionStorage.setItem("tweethub_user", JSON.stringify(user));
      login(user);
    }
  }
  useEffect(() => {
    if (!authState.isLoggedIn) {
      updateUser();
    }
  }, []);
  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook to consume the context
export default AuthProvider;
// create use auth function
export const useAuth = () => useContext(AuthContext);
export const LogoutUserAction = () => useContext(AuthContext).logout;
