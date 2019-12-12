import axios from "axios";

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true //<-- Goes with CORS credentials
    });
  }

  getUser(id) {
    return this.auth.get(`/users/${id}`).then(res => {
      res.data.password = "*";
      return res.data;
    });
  }
}

const axiosRequestFunctions = new Auth();

export default axiosRequestFunctions;
