import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import BookingsPage from "./BookingsPage";

export default function Profile() {
  const { user, ready, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  const navigate = useNavigate();

  if (!ready) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }

  // console.log("SubPage", subpage);

  const linkClassess = (type) => {
    if (subpage === undefined) subpage = "profile";
    let classes = "inline-flex gap-1 px-5 py-2 rounded-full";
    if (type === subpage) {
      classes += " bg-primary text-white ";
    } else {
      classes += " bg-gray-300";
    }
    return classes;
  };

  const handleLogout = async () => {
    await axios.post("/logout");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    return navigate("/");
  };

  return (
    <nav>
      <div className="w-full flex justify-center mt-8 gap-5">
        <Link className={linkClassess("profile")} to={"/profile"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          My Profile
        </Link>
        <Link className={linkClassess("bookings")} to={"/profile/bookings"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          My Bookings
        </Link>
        <Link className={linkClassess("places")} to={"/profile/places"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          My Places
        </Link>
      </div>
      {subpage === "profile" && (
        <div className="text-center mt-8 max-w-md mx-auto flex flex-col">
          <div className="">
            Logged in as {user.name} ({user.email})
          </div>
          <button onClick={handleLogout} className="submit-btn mt-5">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
      {subpage === "bookings" && <BookingsPage />}
    </nav>
  );
}
