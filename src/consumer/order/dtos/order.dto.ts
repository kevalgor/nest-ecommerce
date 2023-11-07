export class BuyProductDTO {
  product: string;
  quantity: number;
  deliveryAddress: string;
  orderAmount: number;
  discount: number;
  paidAmount: number;
}

export class OrderIdDTO {
  orderId: string;
}
