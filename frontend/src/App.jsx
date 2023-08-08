import { Routes, Route } from "react-router-dom";
import axios from "axios";

import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./pages/Layout.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import { UserContextProvider } from "./UserContext.jsx";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export default function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile/:subpage?" element={<ProfilePage />} />
          <Route path="/profile/:subpage/:action" element={<ProfilePage />} />
          <Route
            path="/profile/:subpage/:action/:id"
            element={<ProfilePage />}
          />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}
