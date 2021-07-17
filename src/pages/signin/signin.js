import React, { useState } from "react";
import "../signup/form.css";
const Signin = () => {
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
        <h2 className="formTitle">Login</h2>
        <p className="formInfo">Please fill in this form to login!</p>
        <hr />
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
        <button type="submit" className="formButton">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Signin;
