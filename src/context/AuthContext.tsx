import { createContext, useEffect, useState, useContext, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";


interface DecodedToken {
  userName?: string;
  userEmail?: string;
  role?: string;
  id?: string;
  exp?: number;
}
interface AuthContextType {
  loginData: DecodedToken | null;
  saveLoginData: (token: string) => void; 
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider(props: { children: ReactNode }) {
  const [loginData, setLoginData] = useState<DecodedToken | null>(null);

  const saveLoginData = (token: string) => {
    if (token) {
      localStorage.setItem('token', token);
      const decodedToken: DecodedToken = jwtDecode(token);
      setLoginData(decodedToken);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      try {
        const decodedToken: DecodedToken = jwtDecode(savedToken);
        setLoginData(decodedToken); 
      } catch (e) {
        localStorage.removeItem('token'); 
      }
    }
  }, []); 

  return (
    <AuthContext.Provider value={{ loginData, saveLoginData }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};