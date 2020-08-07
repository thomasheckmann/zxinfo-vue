import axios from "axios";

export default axios.create({
  baseURL: "https://api.zxinfo.dk/api/zxinfo/scr",
  headers: {
    "Content-type": "application/json",
  },
});
