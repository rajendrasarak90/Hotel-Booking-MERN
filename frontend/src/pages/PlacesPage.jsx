import { Link, useParams, Navigate } from "react-router-dom";
import AddPlacesPage from "./AddPlacesPage";
import { useContext } from "react";
import { UserContext } from "../UserContext";
export default function PlacesPage() {
  const { action } = useParams();
  const { user, places, setPlaces } = useContext(UserContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  // console.log("logged in user info in PlacesPage.jsx", user);

  // console.log("action in PlacesPage.jsx", action);
  return (
    <div className="mt-6">
      {action === undefined && (
        <div className="text-center ">
          <Link
            className="inline-flex gap-1 bg-primary text-white px-5 py-2 rounded-full"
            to="/profile/places/add"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
          <div>
            {places.length > 0 &&
              places.map((place, index) => {
                return (
                  <div
                    key={index}
                    className="flex gap-3 bg-gray-200 p-4 mt-4 rounded-2xl max-h-48"
                  >
                    <div className="w-40 h-40 bg-gray-400 shrink-0">
                      <img
                        className="h-full w-full object-cover"
                        src={`${import.meta.env.VITE_BASE_URL}/assets/${
                          place.photos[0]
                        }`}
                      />
                    </div>
                    <div className="flex flex-col justify-between grow-1">
                      <div>
                        {" "}
                        <h3 className="text-xl">{place.title}</h3>
                        <p className="flex gap-1 text-gray-700 ">
                          {" "}
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
                              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                            />
                          </svg>
                          {place.address}
                        </p>
                        <p
                          className="text-sm text-gray-600 overflow-hidden"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {place.description}
                        </p>
                      </div>

                      <div className="self-end flex gap-2">
                        <Link
                          to={`/profile/places/edit/${place._id}`}
                          className="text-green-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-8 h-8"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </Link>
                        <button className="text-red-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-8 h-8"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {action === "add" && <AddPlacesPage user={user} setPlaces={setPlaces} />}
      {action === "edit" && <AddPlacesPage user={user} setPlaces={setPlaces} />}
    </div>
  );
}
