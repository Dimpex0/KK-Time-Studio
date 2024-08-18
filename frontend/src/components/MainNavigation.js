import { Link } from "react-router-dom";

import { useAccountStore } from "../store/account";

export default function MainNavigation() {
  const isAdmin = useAccountStore((state) => state.isAdmin);
  return (
    <header>
      <nav>
        {isAdmin && "HI, I'm an admin"}
        <p>{isAdmin}</p>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/account/login">Login</Link>
          </li>
          <li>
            <Link to="/account/logout">Logout</Link>
          </li>
          <li>
            <Link to="/account/register">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
