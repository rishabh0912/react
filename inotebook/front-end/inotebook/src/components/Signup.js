import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = (props) => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5001/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
    })
    const json = await response.json();
    console.log(json);
    if(json.success) {
        // redirect
        localStorage.setItem('token', json.token);
        console.log("Token stored in localStorage signup: " + localStorage.getItem('token'));
        navigate("/");
        props.showAlert("Account created successfully", "success");
    }
    else{
        props.showAlert("Invalid credentials", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="nameHelp"
            value={credentials.name}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email} 
            onChange={onChange}            
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password} 
            onChange={onChange}            
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={credentials.cpassword} 
            onChange={onChange}            
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
