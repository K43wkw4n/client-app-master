export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  sizes: string;
  brand: string;
  source: string;
  productImages: ProductImage[];
}

export interface ProductImage {
  id: number;
  image: string;
}
