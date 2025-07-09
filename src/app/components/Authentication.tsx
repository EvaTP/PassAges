
import { createContext } from "react";

type authContextType = "connected" | "disconnected";


export const authContext  = createContext<authContextType>("disconnected");