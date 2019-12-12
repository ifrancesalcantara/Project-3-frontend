import axios from "axios";

class Auth {
  constructor() {
    this.paintings = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true //<-- Goes with CORS credentials
    });
  }

  imageUpload(file) {
    console.log(file);
    return this.paintings.post("/paintings/image", file).then(({ data }) => {
      return data;
    });
  }

  getDetails(id) {
    return this.paintings.get(`/paintings/${id}`).then(({ data }) => {
      return data;
    });
  }

  postPainting(painting) {
    return this.paintings.post("/paintings", painting).then(({ data }) => {
      return data;
    });
  }
}

const axiosRequestFunctions = new Auth();

export default axiosRequestFunctions;
