import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import MainPage, {
  loader as cartsLoader,
  action as removeCart,
} from "./pages/MainPage";
import NewCartForm, {
  action as createCart,
} from "./components/Form/NewCartForm";
import CartDetails from "./components/Details/CartDetails";
import ErrorPage from "./pages/ErrorPage";
import PlaceHolder from "./components/Details/PlaceHolder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
        errorElement: <ErrorPage />,
        loader: cartsLoader,
        action: removeCart,
        children: [
          { index: true, element: <PlaceHolder /> },
          { path: ":cartId", element: <CartDetails /> },
          { path: "new-cart", element: <NewCartForm />, action: createCart },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
