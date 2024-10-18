function formatDate(timestamp) {
  const date = new Date(timestamp);

  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // for AM/PM format
  };

  // Convert the date to your desired format
  return date.toLocaleDateString("en-GB", options).replace(",", ""); // Replace comma with a space
}

export { formatDate };
