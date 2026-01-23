import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import { useAuth, type User } from "./AuthContext";

interface Outlet {
  id: string;
  name: string;
}

interface OutletContextType {
  selectedOutlet: string;
  setSelectedOutlet: (outletId: string) => void;
  outlets: Outlet[];
}

const OutletContext = createContext<OutletContextType | undefined>(undefined);

interface OutletProviderProps {
  children: ReactNode;
}

export const OutletProvider: React.FC<OutletProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const userData = user as User | null;

  const [selectedOutlet, setSelectedOutletState] = useState<string>(
    userData?.activeOutlet?.id ||
      (userData?.outlets?.length > 0 ? userData.outlets[0].id : ""),
  );

  const setSelectedOutlet = (outletId: string) => {
    setSelectedOutletState(outletId);
    // Update localStorage to keep it in sync with context
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        // Update the activeOutlet in the stored user data
        parsedUser.activeOutlet = { id: outletId };
        localStorage.setItem("user", JSON.stringify(parsedUser));
      }
    } catch (e) {
      console.error("Error updating user data in localStorage:", e);
    }
    // Optionally trigger custom event for broader observability
    window.dispatchEvent(
      new CustomEvent("outletChanged", { detail: { outletId } }),
    );
  };

  const outlets = userData?.outlets || [];

  return (
    <OutletContext.Provider
      value={{
        selectedOutlet,
        setSelectedOutlet,
        outlets,
      }}
    >
      {children}
    </OutletContext.Provider>
  );
};

export const useOutlet = (): OutletContextType => {
  const context = useContext(OutletContext);
  if (context === undefined) {
    throw new Error("useOutlet must be used within an OutletProvider");
  }
  return context;
};
