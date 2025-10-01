// toutes les données volunteers pour l'admin
// types/volunteers.ts
import { Moment } from "./moments";
import { Activity } from "./activities";
import { City } from "./cities";

export interface Volunteer {
  id: number;
  firstname: string;
  lastname: string;
  role: string | null;
  password: string | null;
  zipcode: string | null;
  motivation: string | null;
  email: string | null;
  created_at: Date | null;
  updated_at: Date | null;

  // Clés étrangères
  city_id: number | null;
  activity_id: number | null;

  // Relations complètes
  moments?: Moment[];
  activities?: Activity | null;
  cities?: City | null;
}

// interface pour les données brutes reçues de l'API (avant conversion des dates)
export interface VolunteerRaw {
  id: number;
  firstname: string;
  lastname: string;
  role: string | null;
  password: string | null;
  zipcode: string | null;
  motivation: string;
  email: string | null;
  created_at: string | null;
  updated_at: string | null;
  city_id: number | null;
  activity_id: number | null;
}

// interface ADMIN pour le formulaire de création de volontaires dans le dashboard
export interface VolunteerFormAdminData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  city: string; // texte libre
  zipcode?: string;
  motivation: string;
  activity_id: number;
}
