import { emptyStar } from "./images"
import userService from "./../services/user-services"

async function handleLikeAndToggleImageSource (e, userId) {
  if (e.target.src === emptyStar) {
    const paintingId = e.target.alt;
    const result = await userService.handleLike(`/handle-like/like/${userId}/${paintingId}`)
    this.setState({usersWhoLiked: result})
    return result
  } else {
    const paintingId = e.target.alt;
    const result =  await userService.handleLike(`/handle-like/unlike/${userId}/${paintingId}`)
    this.setState({usersWhoLiked: result})
    return result
  }
};

const timeSince = date => {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  };

export { handleLikeAndToggleImageSource, timeSince };
