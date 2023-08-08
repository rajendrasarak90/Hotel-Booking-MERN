import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddPlacesPage(props) {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const navigate = useNavigate();

  const { action, id } = useParams();
  if (action === "edit") {
    console.log("place id", id);
  }
  console.log("actionin addplacespage", action);
  // console.log(props.user._id);
  async function addPhotoByLink(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/upload-by-link", { link: photoLink });
      if (data) {
        setPhotos((prevPhotos) => [...prevPhotos, data]);
      }
      setPhotoLink("");
    } catch (err) {
      console.log("Error while uploading linkPhoto", err);
    }
  }
  async function addPhotoFromDevice(e) {
    e.preventDefault();
    const files = e.target.files;
    console.log(files);
    const data = new FormData();
    for (let file of files) {
      data.append("photos", file);
    }

    const response = await axios.post("/upload-from-device", data, {
      headers: { "Content-type": "multipart/form-data" },
    });
    setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
    return;
  }

  function handleSelectPerks(e) {
    const perkName = e.target.name;
    // console.log(perkName);
    if (e.target.checked) {
      setPerks((prevPerks) => [...prevPerks, perkName]);
    } else {
      setPerks((prevPerks) => prevPerks.filter((perk) => perk !== perkName));
    }
  }

  async function handleSavePlace(e) {
    e.preventDefault();
    if (action === "edit") {
      const response = await axios.put("/places/edit", { id });
      if (response.data) {
        props.setPlaces((prevPlaces) =>
          prevPlaces.map((place) => (place._id === id ? response.data : place))
        );
        return navigate("/profile/places");
      }
    } else if (action === "add") {
      const response = await axios.post("/places/add", {
        owner: props.user._id,
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });
      if (response.data) {
        props.setPlaces((prevPlaces) => [...prevPlaces, response.data]);
        return navigate("/profile/places");
      }
    }
  }

  return (
    <form onSubmit={handleSavePlace}>
      <div>
        <h2 className="place-head">Title</h2>
        <p className="place-short-info">
          Title for your place should be short and atractive
        </p>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="title, eg. 2BHK Apartment"
        />
      </div>
      <div>
        <h2 className="place-head">Address</h2>
        <p className="place-short-info"> Detail address of your place</p>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          placeholder="your appartment address"
        />
      </div>
      <div>
        <h2 className="place-head">Photos</h2>
        <p className="place-short-info">Photos for better clearity of place</p>
        <div className="flex gap-2">
          <input
            value={photoLink}
            onChange={(e) => setPhotoLink(e.target.value)}
            type="text"
            placeholder="Add using a link eg. https://place.jpg"
          />
          <button
            onClick={addPhotoByLink}
            className="bg-gray-300 rounded-2xl px-4"
          >
            Add&nbsp;Photo
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6">
          {photos.length > 0 &&
            photos.map((link, index) => (
              <div className="flex h-32 gap-2" key={`photos-${index}`}>
                <img
                  className="rounded-2xl border w-full object-cover"
                  src={import.meta.env.VITE_BASE_URL + "/assets/" + link}
                />
              </div>
            ))}
          <label className="flex h-32 gap-1 justify-center rounded-2xl items-center border cursor-pointer">
            <input
              type="file"
              className="hidden"
              multiple
              onChange={addPhotoFromDevice}
            />
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
                d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
            Upload
          </label>
        </div>
      </div>
      <div>
        <h2 className="place-head">Description</h2>
        <p className="place-short-info">
          More detail information of your place
        </p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <h2 className="place-head">Perks</h2>
        <p className="place-short-info">
          Select the perks or extra benifits of your place
        </p>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          <label className="perk-checkbox">
            <input name="Wifi" type="checkbox" onChange={handleSelectPerks} />
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
                d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
              />
            </svg>

            <span>Wifi</span>
          </label>
          <label className="perk-checkbox">
            <input
              name="Free Parking Spot"
              type="checkbox"
              onChange={handleSelectPerks}
            />
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
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>

            <span>Free Parking Spot</span>
          </label>
          <label className="perk-checkbox">
            <input
              name="Smoke alarm"
              type="checkbox"
              onChange={handleSelectPerks}
            />
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
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
              />
            </svg>

            <span>Smoke alarm</span>
          </label>
          <label className="perk-checkbox">
            <input name="TV" type="checkbox" onChange={handleSelectPerks} />
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
                d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>

            <span>TV</span>
          </label>
          <label className="perk-checkbox">
            <input
              name="Private Entrance"
              type="checkbox"
              onChange={handleSelectPerks}
            />
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
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>

            <span>Private Entrance</span>
          </label>
          <label className="perk-checkbox">
            <input
              name="Mountain View"
              type="checkbox"
              onChange={handleSelectPerks}
            />
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
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>

            <span>Mountain View</span>
          </label>
        </div>
      </div>
      <div>
        <h2 className="place-head">Extra Info</h2>
        <p className="place-short-info"> Housing rules and regulations</p>
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
      </div>
      <div>
        <h2 className="place-head">Check in&out times</h2>
        <p className="place-short-info">
          time slots for cleaning the room between guests
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <label>
            <span>Check in time</span>
            <input
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="mt-1"
              type="text"
              placeholder="eg. 14:00"
            />
          </label>
          <label>
            <span>Check out time</span>
            <input
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="mt-1"
              type="text"
              placeholder="eg. 14:00"
            />
          </label>
          <label>
            <span>max guests allowed</span>
            <input
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              className="mt-1"
              type="number"
              placeholder="eg. 14:00"
            />
          </label>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="w-1/4 bg-primary px-3 py-2 mb-2 rounded-2xl text-white text-xl my-5">
          Save
        </button>
      </div>
    </form>
  );
}
