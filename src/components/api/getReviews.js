import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000/';

export const fetchReviews = async () => {
    
    const response = await axios.get(`reviews`);
  return response.data
}