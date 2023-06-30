// import http from "../http-common";
import axios from "axios";

class UploadFilesService {
  upload(file, api_base_url, offsetx, offsety, zx80, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    const http = axios.create({
      baseURL: `${api_base_url}/scr`,
      headers: {
        "Content-type": "application/json",
      },
    });
    return http.post(`/upload?ox=${offsetx}&oy=${offsety}&zx80=${zx80}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }
}

export default new UploadFilesService();
