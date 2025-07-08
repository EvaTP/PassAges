// toutes les données elders pour l'admin
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
  city_id: number | null;
  zipcode: string | null;
  activity_id: number | null;
  moments?: Moment[];
  activities?: Activity | null;
  cities?: City | null;
}
