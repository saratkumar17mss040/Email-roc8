import { useEmailContext } from "../context/EmailContext";

const filters = [
  { label: "All", value: "all" },
  { label: "Unread", value: "unread" },
  { label: "Read", value: "read" },
  { label: "Favorites", value: "favorite" },
];

export default function EmailFilter() {
  const { emailFilter, setEmailFilter } = useEmailContext();

  // Handle filter change
  function handleFilterChange(filter) {
    setEmailFilter(filter);
  }

  return (
    <div className="flex justify-around my-4 font-semibold">
      <p className="px-4 py-2">Filter by:</p>
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={`px-4 py-2 rounded-full  ${
            emailFilter === filter.value ? "bg-gray-200" : ""
          }`}
          onClick={() => handleFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
