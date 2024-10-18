const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const fetchAllEmails = async (pageNo = 1) => {
  const response = await fetch(`${API_BASE_URL}/?page=${pageNo}`);
  if (!response.ok) {
    throw new Error("Error fetching emails, response not ok");
  }
  const data = await response.json();
  return data;
};

const fetchEmailBodyById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/?id=${id}`);
  if (!response.ok) {
    throw new Error("Error fetching email body by id, response not ok");
  }
  const data = await response.json();
  return data;
};

export const emailApiClient = {
  fetchAllEmails,
  fetchEmailBodyById,
};
