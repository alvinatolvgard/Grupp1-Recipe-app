import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import "./LoginPage.css";

/**
 * Sida för användarinlogg.
 * @author Sanel
 */

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "test@test.com" && password === "123") {
      setError("");
      login({ email, name: "Demo User" });
      navigate("/");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email adress"
          value={email}
          className="login-input"
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="login-input"
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
          }}
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-button">
            Sign In
          </button>
      </form>
    </div>

        );
      };

      export default LoginPage;