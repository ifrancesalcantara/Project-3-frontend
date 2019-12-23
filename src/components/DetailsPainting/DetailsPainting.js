import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";

import "./DetailsPainting.css";

import paintingService from "../../lib/services/painting-service";

import LoadingGif from "../LoadingGif";
import Image from "./../Image";
import CreatorDetails from "./CreatorDetails/CreatorDetails";
import Tags from "./Tags/Tags";
import Title from "./Title/Title";
import CreationDate from "./CreationDate/CreationDate";
import Info from "./Info/Info";

class PaintingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paintingId: props.paintingId,
      paintingDetails: {}
    };
  }

  componentDidMount = async () => {
    setTimeout(async () => {
      const imgData = await paintingService.getDetails(this.state.paintingId);
      this.setState({ paintingDetails: imgData });
    }, 50);
  };

  render() {
    const { user, isLoggedIn } = this.props;
    const {
      image,
      title,
      description,
      creator,
      creatorUsername,
      timesSeen,
      usersWhoLiked,
      tags,
      created_at,
      game
    } = this.state.paintingDetails;
    const paintingId = this.state.paintingDetails._id;

    return (
      <div>
        {!this.state.paintingDetails.image ? (
          <LoadingGif />
        ) : isLoggedIn ? (
          <div className="details-div">

            <div>

              <Image src={image} view="display" className="edit-main-img" />

              <Info
                loggedIn
                timesSeen={timesSeen}
                usersWhoLiked={usersWhoLiked}
                user={user}
                paintingId={paintingId}
                game={game}
              />

              {user._id === creator ? (
                <Title
                  ownPainting
                  id={this.state.paintingDetails._id}
                  title={title}
                />
              ) : (
                <Title title={title} />
              )}

              {!description ? null : (
                <p className="details-description">{description}</p>
              )}

              <Tags tags={tags} />

              <CreatorDetails
                user={user}
                creator={creator}
                creatorUsername={creatorUsername}
              />

              <CreationDate created_at={created_at} />

            </div>

          </div>
        ) : (
          <div className="details-div">

            <Image src={image} view="display" className="edit-main-img" />

            <Title title={title} />

            {!description ? null : (
              <p className="details-description">{description}</p>
            )}

            <Tags tags={tags} />

            <CreatorDetails
              user={user}
              creator={creator}
              creatorUsername={creatorUsername}
            />

            <CreationDate created_at={created_at} />
            
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(PaintingDetails);
