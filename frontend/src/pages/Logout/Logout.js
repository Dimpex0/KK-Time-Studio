import { getCsrfToken } from "../../utils/auth";

export default function LogoutPage() {
  async function handleLogout() {
    const response = await fetch(
      `${process.env.REACT_APP_DOMAIN}/account/logout/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CSRFToken": getCsrfToken(),
        },
      }
    );
    if (response.ok) {
      // TODO
    } else {
      // TODO
    }
  }
  return <button onClick={handleLogout}>Logout</button>;
}
