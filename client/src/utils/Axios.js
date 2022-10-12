import axios from "axios";
import {host} from "./APIRoutes"

const accessToken = localStorage.getItem("token");

const authAxios = axios.create({
     baseURL: host,
     headers: {
          authorization: `Bearer ${accessToken}`
     }
})

export default authAxios;