import axios from "axios";

class Auth {
  constructor() {
    this.chat = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true //<-- Goes with CORS credentials
    });
  }

  getChatData(ids) {
    const { creatorId, userId } = ids;
    return this.chat
      .get(`/chat/${creatorId}/${userId}`)
      .then(({ data }) => data);
  }

  postComment(data) {
    const { userId, creatorId, newCommentData } = data;
    return this.chat
      .post(`/chat/comment/${creatorId}/${userId}`, newCommentData)
      .then(data => {
        return data;
      });
  }
}

const axiosRequestFunctions = new Auth();

export default axiosRequestFunctions;
