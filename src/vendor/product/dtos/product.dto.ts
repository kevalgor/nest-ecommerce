export class AddProductDTO {
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  discount: number;
}

export class ProductIdDTO {
  productId: string;
}

export class UpdateProductDTO {
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  discount: number;
}
