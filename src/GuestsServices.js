import axios from "axios";

// const BASE_URL = "http://localhost:3005"
const BASE_URL = "https://wedding-api-alexis.herokuapp.com";

const getGuests = () => {
  return axios.get(`${BASE_URL}/api/guests`);
};

const createGuest = (guest) => {
  return axios.post(`${BASE_URL}/api/guests`, guest);
};

const updateGuest = (guestId, guest) => {
  return axios.put(`${BASE_URL}/api/guests/${guestId}`, guest);
};

const deleteGuest = (guestId) => {
  return axios.delete(`${BASE_URL}/api/guests/${guestId}`);
};

export { getGuests, createGuest, updateGuest, deleteGuest };
