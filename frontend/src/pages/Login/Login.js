import { useState } from "react";

import { getCsrfToken } from "../../utils/auth";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  function handleInputChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_DOMAIN}/account/login/`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
        },
      }
    );
    if (!response.ok) {
      // TODO
    } else {
      // TODO
    }
  }
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          name="email"
          type="email"
          value={formData.email}
          required
          onChange={handleInputChange}
        />
        <input
          placeholder="Password"
          name="password"
          type="password"
          value={formData.password}
          required
          onChange={handleInputChange}
        />
        <button>Login</button>
      </form>
    </>
  );
}
