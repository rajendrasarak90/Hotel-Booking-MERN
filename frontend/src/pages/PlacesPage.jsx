import { Link } from "react-router-dom";
export default function PlacesPage() {
  return (
    <div className="text-center mt-6">
      <Link
        className="inline-flex gap-1 bg-primary text-white px-5 py-2 rounded-full"
        to="/profile/places/new"
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
    </div>
  );
}
