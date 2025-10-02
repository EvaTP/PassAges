// src/types/paramsid.ts
export type ParamsWithId = {
  id: string;
};

// Utilisation : import { ParamsWithId } from "@/app/types/paramsid";
// Puis dans la fonction : export async function GET(req: NextRequest, { params }: ParamsWithId) {
// Ensuite, accès à l'ID via params.id
