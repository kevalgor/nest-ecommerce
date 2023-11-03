export class AddCartProductDTO {
  product: string;
  consumer: string;
  quantity: number;
}

export class CartProductIdDTO {
  cartProductId: string;
}

export class UpdateCartProductDTO {
  quantity: number;
}
