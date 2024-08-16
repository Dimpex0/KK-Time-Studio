import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import HomePage from "./pages/Home/Home";
import RootLayout from "./pages/Root/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
