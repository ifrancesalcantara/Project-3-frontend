import axios from "axios";

const baseURL= process.env.REACT_APP_API_URL

class Auth {
  constructor() {
    this.chat = axios.create({
      baseURL: baseURL,
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
    console.log("conna send as body. ", newCommentData);
    return this.chat
      .post(`/chat/comment/${creatorId}/${userId}`, newCommentData)
      .then(data => {
        console.log("this is the data that i get from server", data);
        return data;
      });
  }
}

const axiosRequestFunctions = new Auth();

export default axiosRequestFunctions;
