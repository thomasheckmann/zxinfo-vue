import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8300/api/zxinfo/scr",
  headers: {
    "Content-type": "application/json",
  },
});
