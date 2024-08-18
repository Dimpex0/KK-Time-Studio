import { useAccountStore } from "../../store/account";
import { getCsrfToken } from "../../utils/auth";

export default function LogoutPage() {
  const resetAccount = useAccountStore((state) => state.reset);
  function handleLogout() {
    fetch(`${process.env.REACT_APP_DOMAIN}/account/logout/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CSRFToken": getCsrfToken(),
      },
    });
    resetAccount();
  }
  return <button onClick={handleLogout}>Logout</button>;
}
