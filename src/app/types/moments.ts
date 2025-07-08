// types/moments.ts
import { Volunteer } from "./volunteers";

export interface Moment {
  id: number;
  title: string;
  description?: string;
  date: Date;
  volunteer_id: number;
  // Relations
  volunteer?: Volunteer;
}
