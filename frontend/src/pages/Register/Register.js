import { useState } from "react";

import { getCsrfToken } from "../../utils/auth";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    password2: "",
  });

  function handleInputChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_DOMAIN}/account/register/`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
        },
      }
    );

    const responseData = await response.json();
    if (response.ok) {
      setError("");
      setMessage(responseData.message);
    } else {
      setError(responseData.message);
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      <input
        placeholder="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <input
        placeholder="Password"
        name="password1"
        type="password"
        value={formData.password1}
        onChange={handleInputChange}
        required
      />
      <input
        placeholder="Confirm password"
        name="password2"
        type="password"
        value={formData.password2}
        onChange={handleInputChange}
        required
      />
      <button>Register</button>
    </form>
  );
}
