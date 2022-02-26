import axios from "axios";
const BASE_URL = "http://localhost:3000/"

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json"
  }
});

export {BASE_URL}