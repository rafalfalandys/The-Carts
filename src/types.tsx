export type Product = {
  discountPercentage: number;
  discountedPrice: number;
  id: number;
  price: number;
  quantity: number;
  title: string;
  total: number;
};

export type Cart = {
  discountedTotal: number;
  id: number;
  products: Product[];
  total: number;
  totalProducts: 5;
  totalQuantity: number;
  userId: number;
};
