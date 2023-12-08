import "./SignUp.scss";
import { useState } from "react";
import axios from "axios";

export const SignUp = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formError, setFormError] = useState("");

  const validateFormInput = async (event) => {
    event.preventDefault();

    const config = {
      header: {
        "Content-type": "application/json",
      },
    };
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => setFormError(""), 5000);
      return setFormError("Password Do not match");
    }

    try {
      const data = await axios.post(
        "http://localhost:8080/user/signup",
        {
          username,
          email,
          password,
        },
        config
      );
      localStorage.setItem("authToken", data.token);
      if (data.status === 201) {
        alert("user added succesfully");
      }
      console.log(data);
    } catch (error) {
      setFormError(error.response.data.error);
      setTimeout(() => {
        setFormError("");
      }, 5000);
    }
  };

  return (
    <form className="form-container" onSubmit={validateFormInput}>
      {formError && <span className="error-message">{formError}</span>}
      <input
        value={firstname}
        placeholder="First Name"
        onChange={(e) => setFirstname(e.target.value)}
      />

      <input
        value={lastname}
        placeholder="Last Name"
        onChange={(e) => setLastname(e.target.value)}
      />
      <input
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        value={password}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        value={confirmPassword}
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <input type="submit" value={"GET STARTED"} />
    </form>
  );
};
