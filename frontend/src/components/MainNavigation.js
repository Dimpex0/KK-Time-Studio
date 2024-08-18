import { Link } from "react-router-dom";

export default function MainNavigation() {
  return (
    <header>
      <nav>
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
