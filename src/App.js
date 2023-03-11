import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import { loader as cartsLoader } from "./components/Main";
import CartDetails from "./components/Details/CartDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ path: ":cartId", element: <CartDetails /> }],
    loader: cartsLoader,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
