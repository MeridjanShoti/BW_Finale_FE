import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router";

function MyLogin() {

  const [formData, setFormData] = useState({
      username: "",
      password: "",
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
          const response = await fetch("https://api.example.com/login", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            throw new Error("Registration failed");
          }
    
          setSuccess(true);
          setFormData({
            username: "",  
            password: "",
          
          });
        } catch (err) {
          setError(err.message);
        }
      };    


  return (
    <div>
    <h2 className="text-center">Accedi</h2>
    {error && <p style={{ color: "red" }}>{error}</p>}
    {success && <p style={{ color: "green" }}>Registration successful!</p>}
    <form onSubmit={handleSubmit}>

      <div>
      <div className=" d-flex justify-content-between my-2">
        <label className="">Username:</label>
        <input className="rounded-2 border border-secondary " type="text" name="username" value={formData.username} onChange={handleChange} required />
      </div>
    
      <div className=" d-flex justify-content-between my-2">
        <label>Password:</label>
        <input className="rounded-2 border border-secondary " type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      
      </div>
    
      <div className="d-flex justify-content-between my-2">
    <Button type="submit" variant="outline-success">Login</Button>
    <Link to="/access" variant="outline-secondary" >Registrati</Link>
    </div>
     
    </form>
  </div>


   
  );
}
export default MyLogin;
