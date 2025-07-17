
import { createContext } from "react";


 export type authContextType = "connected" | "disconnected";

// Par défaut l'utilisateur est déconnecté
// createContext permet de partager l'information
export const authContext  = createContext<authContextType>("disconnected");

export default function Authentication()
{

    return(
        <div>
            
        </div>
    )
}

// Le provider injecte la valeur (connecté|déconnecté)
export function Provider()
{

}

// Terme	Rôle
// createContext	Crée un canal de communication global
// Provider	Fournit une valeur (ou un état) à ce canal
// useContext	Lit la valeur du contexte, où que tu sois dans l’arborescence