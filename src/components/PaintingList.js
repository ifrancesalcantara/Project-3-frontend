import React, { Component } from "react";
import { Link } from "react-router-dom"
import axios from "axios"
import shortid from "shortid"

export default class PaintingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paintings: props.paintings,
      userProfilePics: {}
    };
  }

  componentDidMount(){
      this.state.paintings.forEach(painting=>{
          console.log("HELLO")
          if(!this.state.userProfilePics[painting.creatorUsername]){
              axios.get(`http://localhost:5000/users/${painting.creator}`)
                .then(res=>{
                    const userProfilePicsCopy = {...this.state.userProfilePics}
                    userProfilePicsCopy[painting.creatorUsername] = res.data.profilePic
                    this.setState({ userProfilePics: userProfilePicsCopy })
                })
                .catch(err=>console.log(err))
          }
      })
  }

  render() {
    return (
      <div>
        {this.state.paintings.map((painting, i) => {
            return (
                <div key={shortid.generate()}>
                    <img src={painting.image} alt="" className="container"/>
                    {/* {!this.state.profileImages[i] ? null : */}
                        <div>
                            <Link to={`/chat/${painting.creator}`}>
                                <img src={this.state.userProfilePics[painting.creatorUsername]} alt=""/> 
                                <p>{painting.creatorUsername}</p>
                            </Link>
                        </div>
                    {/* } */}
                </div>
                )
            }
        )}
      </div>
    );
  }
}
