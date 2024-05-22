import React, { useState } from "react";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    const newErrors = { ...errors };

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value || !emailRegex.test(value)) {
        newErrors.email = "Please enter a valid email address.";
      } else {
        delete newErrors.email;
      }
    } else if (name === "password") {
      if (!value) {
        newErrors.password = "Password is required.";
      } else if (value.length < 8) {
        newErrors.password = "Password must be at least 8 characters long.";
      } else {
        delete newErrors.password;
      }
      if (password1 && value !== password1) {
        newErrors.password1 = "Passwords do not match.";
      } else {
        delete newErrors.password1;
      }
    } else if (name === "password1") {
      if (password && value !== password) {
        newErrors.password1 = "Passwords do not match.";
      } else {
        delete newErrors.password1;
      }
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "password1") setPassword1(value);

    validate(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      setEmail("");
      setPassword("");
      setPassword1("");
      setErrors({});
      alert("Form submitted Successfully");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form className="p-4 border rounded bg-light" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${
              errors.email ? "is-invalid" : "is-valid"
            }`}
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${
              errors.password ? "is-invalid" : "is-valid"
            }`}
            name="password"
            id="password"
            value={password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className={`form-control ${
              errors.password1 ? "is-invalid" : "is-valid"
            }`}
            name="password1"
            id="password1"
            value={password1}
            onChange={handleChange}
          />
          {errors.password1 && (
            <div className="invalid-feedback">{errors.password1}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default App;
