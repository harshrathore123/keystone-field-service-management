import axios from "axios";

const API_URL = "http://localhost:8080/api/notifications";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("keystone_token")}`,
  },
});

const getNotifications = async () => {
  const response = await axios.get(
    `${API_URL}/my`,
    getAuthHeader()
  );

  return response.data.data;
};

const getUnreadNotificationCount = async () => {
  const response = await axios.get(`${API_URL}/unread-count`, getAuthHeader());

  return response.data.data;
};

const markAsRead = async (id: number) => {
  const response = await axios.put(
    `${API_URL}/read/${id}`,
    {},
    getAuthHeader(),
  );

  return response.data.data;
};

export default {
  getNotifications,
  markAsRead,
  getUnreadNotificationCount,
};
