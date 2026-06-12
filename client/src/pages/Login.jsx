import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {

  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  

  const handleSubmit = async (e) => {

    e.preventDefault();
    

    try {

      await login(username, password);

      window.location.href = "/";

    } catch {

      alert("Login failed");

    }

  };

  return (
    <div>
      <h1>Inventory System</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Login
        </button>

      </form>
    </div>
  );
};

export default Login;