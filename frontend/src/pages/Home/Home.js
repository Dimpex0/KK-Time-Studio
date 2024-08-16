import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>{process.env.REACT_APP_TEST}</p>
      <Link to="/login">Login</Link>
    </>
  );
}
