import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import MainPage, { loader as cartsLoader } from "./pages/MainPage";
import NewCartForm, {
  action as createCart,
} from "./components/Form/NewCartForm";
import CartDetails, {
  action as removeCart,
} from "./components/Details/CartDetails";
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
        children: [
          { index: true, element: <PlaceHolder /> },
          {
            path: ":cartId",
            element: <CartDetails />,
            errorElement: <ErrorPage />,
            action: removeCart,
          },
          {
            path: "new-cart",
            element: <NewCartForm />,
            errorElement: <ErrorPage />,
            action: createCart,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
