import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";

// Tipo de usuario
interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => void;
  updateUser: (fields: Partial<User>) => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  const updateUser = (fields: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...fields } : prev));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:3000/api/me", {
        headers: { Authorization: token },
      })
      .then((res) => {
        setUser(res.data as User);
        setLoading(false);
      })
      .catch(() => {
        logout();
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        logout,
        updateUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};
