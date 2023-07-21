import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration succefull");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="mt-5 grow flex items-center justify-center">
      <div className="mb-64">
        <h1 className="text-4xl text-center my-5 font-normal ">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="submit-btn">Register</button>
          <div className="text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="underline text-black ml-3">
              Login Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
