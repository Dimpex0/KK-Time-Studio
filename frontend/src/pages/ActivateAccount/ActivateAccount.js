import { useParams } from "react-router-dom";
import { getCsrfToken } from "../../utils/auth";
import { useState } from "react";

export default function ActivateAccountPage() {
  const { uidb64, token } = useParams();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleClick() {
    const response = await fetch(
      `${process.env.REACT_APP_DOMAIN}/account/activate/${uidb64}/${token}/`,
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
      setError();
      setMessage(responseData.message);
    } else {
      setError(responseData.message);
    }
  }

  return (
    <>
      <h1>Activate</h1>
      <p>uidb64: {uidb64}</p>
      <p>token: {token}</p>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Activate account</button>
    </>
  );
}
