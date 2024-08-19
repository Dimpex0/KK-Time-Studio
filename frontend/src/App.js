import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import HomePage from "./pages/Home/Home";
import RootLayout from "./pages/Root/Root";
import LogoutPage from "./pages/Logout/Logout";
import RegisterPage from "./pages/Register/Register";
import ActivateAccountPage from "./pages/ActivateAccount/ActivateAccount";
import { useEffect } from "react";
import { getCsrfToken } from "./utils/auth";
import { useAccountStore } from "./store/account";

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
          { path: "register", element: <RegisterPage /> },
          { path: "activate/:uidb64/:token", element: <ActivateAccountPage /> },
        ],
      },
    ],
  },
]);

function App() {
  const resetAccountData = useAccountStore((state) => state.reset);
  const updateIsLoggedIn = useAccountStore((state) => state.updateIsLoggedIn);
  const updateIsAdmin = useAccountStore((state) => state.updateIsAdmin);

  useEffect(() => {
    async function checkSession() {
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/account/check-session/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCsrfToken(),
          },
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        updateIsLoggedIn(true);
        if (responseData.isAdmin) {
          updateIsAdmin(true);
        }
      } else {
        resetAccountData();
      }
    }

    checkSession();
  }, [resetAccountData, updateIsAdmin, updateIsLoggedIn]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
