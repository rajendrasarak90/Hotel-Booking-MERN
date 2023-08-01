import { useState, useContext } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  if (user) {
    return <Navigate to="/" />;
  }

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration succefull");
      return navigate("/login");
    } catch (err) {
      alert("Registration failed");
      console.log("Error while Registering", err);
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
