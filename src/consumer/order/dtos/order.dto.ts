export class BuyProductDTO {
  product: string;
  consumer: string;
  quantity: number;
  deliveryAddress: string;
  orderAmount: number;
  discount: number;
  paidAmount: number;
}

export class OrderIdDTO {
  orderId: string;
}
