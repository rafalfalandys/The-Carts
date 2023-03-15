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
  totalProducts: number;
  totalQuantity: number;
  userId: number;
};
