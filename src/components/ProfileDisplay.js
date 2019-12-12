import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import shortid from "shortid";

export default class ProfileDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      user: {}
    };
  }

  findUser(id) {
    axios.get(`http://localhost:5000/users/${id}`).then(response => {
      this.setState({ user: response.data });
    });
  }

  componentDidMount = () => {
    this.setState({
      user: this.findUser(this.state.userId)
    });
    setTimeout(() => {
      console.log(this.state);
    }, 2000);
  };

  render() {
    return (
      <div>
        {!this.state.user ? null : (

          <div key={shortid.generate()}>
            <h1>{this.state.user.username}</h1>
            
            {!this.state.user.paintings ? null : (
              <div>
                <h2>Your paintings</h2>
                <ul>
                  {this.state.user.paintings.map(painting => (

                    <div key={shortid.generate()}>

                      <Link to={`/painting/${painting._id}`}>
                        <img src={painting.image} alt="" />
                      </Link>

                      {painting.tags.map(tag => (
                        <span key={shortid.generate()}>#{tag} </span>

                      ))}
                      <Link to={`/painting/edit${painting._id}`}>Edit</Link>
                    
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
