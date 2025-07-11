// toutes les données elders pour l'admin
export interface Elder {
  id: number;
  firstname: string;
  lastname: string;
  password?: string;
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

// données elders sans données sensibles
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

// données elders pour les cards de la page visit
export interface ElderCardDisplay {
  id: number;
  firstname: string;
  age?: number;
  job?: string;
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

export type ElderPicture = {
  id: number;
  picture: string | null;
};
