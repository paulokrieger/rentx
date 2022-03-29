import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.20.174:3333",
});

export { api };
