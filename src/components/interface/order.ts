export interface OrderI {
  _id: string;
  totalOrderPrice: number;
  paymentMethodType: string;
  createdAt: string;
  cartItems: {
    product: {
      title: string;
      imageCover: string;
      price: number;
    };
    count: number;
  }[];
}
