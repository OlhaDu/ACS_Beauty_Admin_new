import axios from "axios";

axios.defaults.baseURL = 'http://16.171.113.245:5000/';

export const fetchReviews = async () => {
    
    const response = await axios.get(`api/feedback`);
  return response.data
}