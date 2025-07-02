export interface Elder {
  firstname: string;
  lastname?: string;
  age?: number;
  job?: string;
  zipcode?: string;
  city?: string;
  type?: string;
  description?: string;
  imageUrl: string;
  id?: string | number;
}

// Vous pouvez aussi ajouter d'autres types liés aux elders
export interface ElderFormData {
  firstname: string;
  lastname: string;
  age: number;
  job: string;
  zipcode: string;
  city: string;
  type: string;
  description: string;
  imageUrl: string;
}

export interface ElderApiResponse {
  elders: Elder[];
  total: number;
  page?: number;
  limit?: number;
}
