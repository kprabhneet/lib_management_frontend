import { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    axios
      .post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      })
      .then((res) => {
        console.log(res.data);

        // ✅ store token
        localStorage.setItem("access", res.data.access);

        alert("Login successful 🔥");
      })
      .catch((err) => {
        console.error(err);
        alert("Login failed ❌");
      });
  };

  return (
    <div>
      <h2>🔐 Login</h2>

      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;