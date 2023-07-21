import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/login", { email, password });
      alert("Logged In Successfully");
    } catch {
      alert("Logged In Successfully");
    }
  };
  return (
    <div className="mt-5 grow flex items-center justify-center">
      <div className="mb-64">
        <h1 className="text-4xl text-center my-5 font-normal ">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="your@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="submit-btn">Login</button>
          <div className="text-center text-gray-500">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline text-black ml-3">
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
