import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./form.css";
const Signup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onChangeHandler = (e) => {
    setForm((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="background">
      <form className="form">
        <h2 className="formTitle">Sign Up</h2>
        <p className="formInfo">
          Please fill in this form to create an account!
        </p>
        <hr />
        <div className="name">
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={(e) => onChangeHandler(e)}
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            placeholder="Last Name"
            onChange={(e) => onChangeHandler(e)}
          />
        </div>
        <input
          type="email"
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={(e) => onChangeHandler(e)}
        />
        <input
          type="password"
          name="password"
          value={form.password}
          placeholder="Password"
          onChange={(e) => onChangeHandler(e)}
        />
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => onChangeHandler(e)}
        />
        <button type="submit" className="formButton">
          Sign in
        </button>
        <p className="signin">
          Already have an account?{" "}
          <NavLink className="link" to="/signin">
            Log in
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Signup;
