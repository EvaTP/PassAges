// types/buttons.ts

// Interface commune pour les boutons
export interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset"; // Pour le type HTML du bouton
}

// Vous pourriez ajouter d'autres props communes ici, par exemple :
// disabled?: boolean; // Pour gérer l'état désactivé
