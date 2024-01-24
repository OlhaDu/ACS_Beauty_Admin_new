import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoiYWRtaXdlMjM0MzI0MmZ3ZW5Ad2Vmd2UyMy5jb20iLCJpc0FkbWluIjoidHJ1ZSIsImlhdCI6MTcwMzU2OTU4NCwiZXhwIjoxNzExMzQ1NTg0fQ.ZCj9Ub0jTLqCOtKTDI1CA-8hDDsLGOcp1-0qgVXMDr8"; // замените на ваш токен
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

axios.defaults.baseURL = "http://13.50.16.182:5000/";

export const fetchReviews = async (pageNumber = 1) => {
  try {
    const response = await axios.get(`api/feedback?page=${pageNumber}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch reviews");
  }
};

export const changeStatus = async (id, credentials) => {
  try {
    const response = await axios.patch(`api/feedback/${id}`, credentials);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch reviews");
  }
};

export const deleteReviews = async (id) => {
  const response = await axios.delete(`api/feedback/${id}`);
  return response.data;
};
