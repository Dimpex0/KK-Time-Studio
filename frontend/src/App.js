import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import HomePage from "./pages/Home/Home";
import RootLayout from "./pages/Root/Root";
import LogoutPage from "./pages/Logout/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "account",
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "logout", element: <LogoutPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
