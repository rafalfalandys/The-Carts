export type Cart = {
  discountedTotal: number;
  id: number;
  products: {
    discountedPercentage: number;
    discountedPrice: number;
    id: number;
    price: number;
    quantity: number;
    title: string;
    total: number;
  }[];
  total: number;
  totalProducts: 5;
  totalQuantity: number;
  userId: number;
};
