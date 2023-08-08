import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    if (!user) {
      axios
        .get("/profile", { withCredentials: true })
        .then((response) => {
          if (response.data !== "Not") {
            setUser(response.data.user);
            setPlaces(response.data.places);
          }
          setReady(true);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <UserContext.Provider
      value={{ user, setUser, ready, setReady, places, setPlaces }}
    >
      {children}
    </UserContext.Provider>
  );
}
