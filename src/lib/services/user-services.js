import axios from "axios";

class Users {
  constructor() {
    this.users = axios.create({
      baseURL: "http://localhost:5000/users",
      withCredentials: true //<-- Goes with CORS credentials
    });
  }

  getUser(id) {
    return this.users.get(`/${id}`).then(res => {
      res.data.password = "*";
      return res.data;
    });
  }
  handleLike(string) {
    return this.users.patch(string).then(res => {
      res.data.password = "*";
      return res.data;
    });
  }
  addSeen(paintingId){
    return this.users.patch(`/add-seen/${paintingId}`).then(res => {
      res.data.password = "*";
      return res.data;
    });
  }
  getUserChatRooms(id) {
    return this.users.get(`/chatrooms/${id}`).then(res => {
      console.log(res.data)
      return res.data;
    });
  }
}

const axiosRequestFunctions = new Users();

export default axiosRequestFunctions;
