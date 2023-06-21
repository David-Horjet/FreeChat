import axios from "axios";
import { host } from "./APIRoutes";

const token = JSON.parse(localStorage.getItem("token"))

export const authAxios = axios.create({
  baseURL: host,
  headers: {
    authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
