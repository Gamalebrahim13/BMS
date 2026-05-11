import {
  createContext,
  useEffect,
  useState,

} from "react";
 import type { ReactNode} from "react";
import { jwtDecode } from "jwt-decode";

// =========================
// Decoded Token Type
// =========================

interface DecodedToken {
  userName?: string;
  email?: string;
  role?: string;
  id?: string;
  exp?: number;
}

// =========================
// Context Type
// =========================

interface AuthContextType {
  userData: DecodedToken | null;
  userToken: string | null;
  saveLoginData: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// =========================
// Create Context
// =========================

export const AuthContext = createContext<AuthContextType | null>(
  null
);

// =========================
// Provider
// =========================

export default function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  // =========================
  // States
  // =========================

  const [userData, setUserData] =
    useState<DecodedToken | null>(null);

  const [userToken, setUserToken] =
    useState<string | null>(null);

  // =========================
  // Save Login Data
  // =========================

  const saveLoginData = (token: string) => {
    // Save token
    localStorage.setItem("token", token);

    // Decode token
    const decoded: DecodedToken = jwtDecode(token);

    // Save states
    setUserData(decoded);
    setUserToken(token);
  };

  // =========================
  // Logout
  // =========================

  const logout = () => {
    localStorage.removeItem("token");

    setUserData(null);
    setUserToken(null);
  };

  // =========================
  // Load User On App Start
  // =========================

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      saveLoginData(token);
    }
  }, []);

  // =========================
  // Provider Return
  // =========================

  return (
    <AuthContext.Provider
      value={{
        userData,
        userToken,
        saveLoginData,
        logout,
        isAuthenticated: !!userToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}