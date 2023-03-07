import axios from "axios";

const params = {
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/",
};

const axiosInstance = axios.create(params);

const api = (axios) => {
  return {
    get: (url, config = {}) => axios.get(url, config),
    post: (url, body, config = {}) => axios.post(url, body, config),
    put: (url, body, config = {}) => axios.put(url, body, config),
    delete: (url, body, config = {}) => axios.delete(url, body, config),
  };
};

export default api(axiosInstance);
