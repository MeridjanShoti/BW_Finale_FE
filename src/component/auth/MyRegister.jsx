import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router";

const MyRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    nome: "",
    cognome: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("token");
      const response = await fetch(apiUrl + "/register", "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      setSuccess(true);
      setFormData({
        username: "",
        email: "",
        password: "",
        nome: "",
        cognome: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2 className="text-center">Registrati</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Registration successful!</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <div className=" d-flex justify-content-between my-2">
            <label className="">Username:</label>
            <input
              className="rounded-2 border border-secondary "
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className=" d-flex justify-content-between my-2">
            <label>Email:</label>
            <input
              className="rounded-2 border border-secondary "
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className=" d-flex justify-content-between my-2">
            <label>Password:</label>
            <input
              className="rounded-2 border border-secondary "
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className=" d-flex justify-content-between my-2">
            <label>Nome:</label>
            <input
              className="rounded-2 border border-secondary "
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className=" d-flex justify-content-between my-2">
            <label>Cognome:</label>
            <input
              className="rounded-2 border border-secondary "
              type="text"
              name="cognome"
              value={formData.cognome}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="d-flex justify-content-between my-2">
          <Button type="submit" variant="outline-success">
            Registrati
          </Button>
          <Link to="/login" variant="outline-secondary">
            Effettua il login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default MyRegister;
