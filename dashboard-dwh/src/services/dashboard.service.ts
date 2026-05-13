import axios from "axios";

const API = "http://localhost:3003/api/etl/dashboard";

export const obtenerDashboard = async () => {
  const response = await axios.get(API);
  return response.data.data;
};
