import axios from "axios";
import type { TimeLog } from "../types/timeLog";

const API_URL = "http://localhost:8080/api/timelogs";

const getAuthHeader = () => {
  const token = localStorage.getItem("keystone_token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllTimeLogs = async (): Promise<TimeLog[]> => {
  const response = await axios.get(API_URL, getAuthHeader());
  return response.data.data;
};

export const getTimeLogById = async (
  id: number,
): Promise<TimeLog> => {
  const response = await axios.get(
    `${API_URL}/${id}`,
    getAuthHeader(),
  );

  return response.data.data;
};

export const createTimeLog = async (
  timeLog: TimeLog,
): Promise<TimeLog> => {
  const response = await axios.post(
    API_URL,
    timeLog,
    getAuthHeader(),
  );

  return response.data.data;
};

export const updateTimeLog = async (
  id: number,
  timeLog: TimeLog,
): Promise<TimeLog> => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    timeLog,
    getAuthHeader(),
  );

  return response.data.data;
};

export const deleteTimeLog = async (
  id: number,
): Promise<void> => {
  await axios.delete(
    `${API_URL}/${id}`,
    getAuthHeader(),
  );
};