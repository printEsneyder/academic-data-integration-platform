import axios from "axios";
import type { DashboardData } from "../types/dashboard.types";

const API = "/api/etl/dashboard";

export const obtenerDashboard = async (): Promise<DashboardData> => {
  const response = await axios.get(API);

  return response.data.data;
};