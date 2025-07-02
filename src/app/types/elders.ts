// toutes les données elder
export interface Elder {
  id: number;
  firstname: string;
  lastname: string;
  password?: string; // Généralement on ne l'expose pas côté client
  email?: string;
  age?: number;
  job?: string;
  city_id?: number;
  zipcode?: string;
  activity_id?: number;
  description?: string;
  picture?: string;
  created_at?: Date;
  updated_at?: Date;
  // Relations optionnelles
  activities?: {
    id: number;
    name: string;
  };
  cities?: {
    id: number;
    name: string;
  };
}

// données elder sans données sensibles
export interface PublicElder {
  id: number;
  firstname: string;
  lastname: string;
  age?: number;
  job?: string;
  zipcode?: string;
  description?: string;
  picture?: string;
  activities?: {
    id: number;
    name: string;
  };
  cities?: {
    id: number;
    name: string;
  };
}

// Photos elders
export type ElderPicture = Pick<PublicElder, "id" | "picture">;
