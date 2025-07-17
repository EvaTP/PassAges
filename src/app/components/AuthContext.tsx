import { createContext, useContext, useState, ReactNode } from "react";

// 👉 Le bon type du contexte
type AuthContextType = {
  authStatus: "connected" | "disconnected";
  setAuthStatus: (status: "connected" | "disconnected") => void;
};

// ❗ Ici, on passe explicitement le type à createContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Le Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authStatus, setAuthStatus] = useState<"connected" | "disconnected">("disconnected");

  // ✅ La valeur fournie correspond exactement à AuthContextType
  const contextValue: AuthContextType = { authStatus, setAuthStatus };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Le hook pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

