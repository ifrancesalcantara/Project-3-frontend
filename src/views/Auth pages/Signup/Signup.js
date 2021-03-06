import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../../lib/AuthProvider";
import authService from "../../../lib/services/auth-service";
import "./signup.css";

import { profileImages } from "../../../lib/config/images";
import LoadingGif from "./../../../components/LoadingGif";

var profileImagesIndex = Math.floor(Math.random() * profileImages.length);

class Signup extends Component {
  state = { username: "", password: "", image: null, imageLoaded: true };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password, image } = this.state;
    this.props.signup({ username, password, image });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    setTimeout(()=>console.log(this.state), 200)
  };

  fileChange = event => {
    this.setState({ imageLoaded: false });
    const file = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append("photo", file);

    authService
      .imageUpload(uploadData)
      .then(image => {
        this.setState({ image });
        this.setState({ imageLoaded: true });
      })
      .catch(error => console.log(error));
  };

  changeImage(instruction) {
    switch (instruction) {
      case "to_previous":
        profileImagesIndex--;
        if (profileImagesIndex < 1) {
          profileImagesIndex = profileImages.length - 1;
        }
        break;
      case "to_next":
        profileImagesIndex++;
        if (profileImagesIndex > profileImages.length - 1) {
          profileImagesIndex = 1;
        }
        break;
      default:
    }
    this.setState({
      image: profileImages[profileImagesIndex]
    });
  }

  componentDidMount() {
    this.setState({
      image: profileImages[profileImagesIndex]
    });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="signup">
        <div className="auth-background">
          <div></div>
        </div>
        <div className="signup-backgound"></div>
        <img
          id="auth-back"
          onClick={() => this.props.history.push("/")}
          src="https://img.icons8.com/metro/52/000000/back.png"
          alt=""
        />
        <h1>Welcome!!</h1>
        {!this.state.image ? null : (
          <div>
            <img
              id="signup-back-arrow"
              src="https://img.icons8.com/material-two-tone/96/000000/back.png"
              alt=""
              onClick={() => this.changeImage("to_previous")}
            />
            {!this.state.imageLoaded ? (
              <LoadingGif
                view="signup"
                className="signup-profile-img loading-profile-img"
              />
            ) : (
              <img
                className="signup-profile-img"
                src={this.state.image}
                alt=""
              />
            )}
            <img
              id="signup-next-arrow"
              src="https://img.icons8.com/material/96/000000/forward--v1.png"
              alt=""
              onClick={() => this.changeImage("to_next")}
            />
          </div>
        )}
        <p>Please, fill in the fields below:</p>
        <form
          onSubmit={this.handleFormSubmit}
          noValidate
          encType="multipart/form-data"
        >
          <input
            type="text"
            name="username"
            value={username}
            className="signup-input"
            placeholder="Your username"
            onChange={this.handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Your password"
            className="signup-input"
            value={password}
            onChange={this.handleChange}
          />

          <input
            type="file"
            name="image"
            onChange={e => this.fileChange(e)}
            id="file"
          />
          <label htmlFor="file" className="btn-3">
            <span>Upload an image</span>
          </label>

          <br />
          {this.state.imageLoaded ? (
            <input
              type="submit"
              value="Signup"
              className="signup-btn yellowbutton"
            />
          ) : (
            <input
              type="button"
              value="Signup"
              className="signup-btn disabledbutton"
            />
          )}
        </form>

        <p>
          Already have account? <Link to={"/login"}> Log In</Link>
        </p>
      </div>
    );
  }
}

export default withAuth(Signup);
