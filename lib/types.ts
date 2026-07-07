export interface CakeSize {
  label: string;
  price: number;
}

export interface Cake {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  featured: boolean;
  sizes: CakeSize[];
}
