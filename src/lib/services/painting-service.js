import axios from "axios";
const baseURL= process.env.REACT_APP_API_URL

class Auth {
  constructor() {
    this.paintings = axios.create({
      baseURL: baseURL+"/paintings",
      withCredentials: true //<-- Goes with CORS credentials
    });
  }

  imageUpload(file) {
    return this.paintings.post("/image", file).then(({ data }) => {
      return data;
    });
  }

  getDetails(id) {
    return this.paintings.get(`/${id}`).then(({ data }) => {
      return data;
    });
  }

  getHomePaintings() {
    return this.paintings.get(`/home`).then(({ data }) => {
      return data;
    });
  }

  postPainting(painting) {
    return this.paintings.post("/", painting).then(({ data }) => {
      return data;
    });
  }

  delete(paintingId) {
    return this.paintings.delete(`/${paintingId}`);
  }

  getFilteredPaintings(filterStr) {
    console.log(filterStr.sort)
    
    return this.paintings.get(`/${filterStr}`);
  }

  updatePaintingByPut(updatedPaiting) {
    return this.paintings.put(`/${updatedPaiting._id}`, updatedPaiting).then(({data})=>data)
  }
}

const axiosRequestFunctions = new Auth();

export default axiosRequestFunctions;
