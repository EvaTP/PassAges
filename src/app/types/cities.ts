// types/cities.ts
import { Volunteer } from "./volunteers";

export interface City {
  id: number;
  name: string;
  zipcode?: string;
  region?: string;
  // Relations
  volunteers?: Volunteer[];
}
