import { Routes, Route } from "react-router-dom";

import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./pages/Layout.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}
