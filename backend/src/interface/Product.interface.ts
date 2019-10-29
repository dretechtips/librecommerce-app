export interface Constructor {
  name: string;
  id: string;
  categoryID: string;
  description: string;
  brand: string;
  rating: number;
  ratingAmount: number;
  directions?: string[];
  warning?: string;
  ingredients?: string[];
  benefits?: string[];
}
export interface NewBody {
  name: string;
  categoryID: string;
  brand: string;
  description: string;
  directions?: string[];
  warning?: string;
  ingredients?: string[];
  benefits?: string[];
}
export interface ExistingBody extends NewBody {
  id: string;
  rating: number;
  ratingAmount: number;
}

export interface SearchQuery {
  name: string;
  id: string;
  categoryID: string;
  rating: number;
}
