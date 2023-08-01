import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  if (user) {
    return <Navigate to="/" />;
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data);
      alert("Login Successful");
      return navigate("/");
    } catch (err) {
      alert("Login Failed");
      console.log("Error while login", err);
    }
  };
  return (
    <div className="mt-5 grow flex items-center justify-center">
      <div className="mb-64">
        <h1 className="text-4xl text-center my-5 font-normal ">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLogin}>
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
