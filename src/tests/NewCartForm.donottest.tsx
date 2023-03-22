import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NewCartForm from "../components/Form/NewCartForm";
import { Cart } from "../types";

const carts: Cart[] = [
  {
    discountedTotal: 20,
    id: 3,
    products: [
      {
        discountPercentage: 10,
        discountedPrice: 18,
        id: 1,
        price: 99,
        quantity: 1,
        title: "prod 1",
        total: 89,
      },
      {
        discountPercentage: 5,
        discountedPrice: 29,
        id: 2,
        price: 199,
        quantity: 3,
        title: "prod 2",
        total: 589,
      },
    ],
    total: 899,
    totalProducts: 2,
    totalQuantity: 4,
    userId: 21,
  },
  {
    discountedTotal: 10,
    id: 4,
    products: [
      {
        discountPercentage: 15,
        discountedPrice: 40,
        id: 2,
        price: 99,
        quantity: 1,
        title: "prod 3",
        total: 120,
      },
      {
        discountPercentage: 20,
        discountedPrice: 160,
        id: 7,
        price: 200,
        quantity: 2,
        title: "prod 4",
        total: 1589,
      },
    ],
    total: 1899,
    totalProducts: 3,
    totalQuantity: 7,
    userId: 27,
  },
];

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useActionData: () => {},
  useNavigation: () => ({ navigation: { state: "idle" } }),
  useNavigate: () => {},
  useOutletContext: () => ({
    carts,
    onAddCartHandler: () => {},
  }),
}));

test("click on add products adds product form", () => {
  render(
    <MemoryRouter>
      <NewCartForm />
    </MemoryRouter>
  );
});
