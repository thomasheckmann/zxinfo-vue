// import http from "../http-common";
import axios from "axios";

class UploadFilesService {
  upload(file, api_base_url, offsetx, offsety, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    const http = axios.create({
      baseURL: `${api_base_url}/scr`,
      headers: {
        "Content-type": "application/json",
      },
    });
    return http.post(`/upload?ox=${offsetx}&oy=${offsety}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }
}

export default new UploadFilesService();
