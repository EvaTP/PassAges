import { Volunteer } from "./volunteers";

export interface Activity {
  id: number;
  name: string;
  description?: string;
  // Relations
  volunteers?: Volunteer[];
}
