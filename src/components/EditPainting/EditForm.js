import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import Image from "./../Image"
import "./EditForm.css";

class PaintingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { painting } = this.props;
    return (
      <div className="edit-painting-div">
        {!painting ? null : (
          <div>
            <h1>Edit</h1>
            <p id="error-message" className="hidden">
              Error mesage
            </p>
            {!painting.image.includes("sketchfab.com") ? (
              <Image view="edit" src={painting.image}/>
            ) : (
              
              <Image view="edit" src={painting.image}/>
            )}
            <form onSubmit={this.props.handleSubmit} className="edit-form">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="title">Title</label>
                    </td>
                    <td>
                      <input
                        className="edit-input"
                        onChange={this.props.handleChange}
                        type="text"
                        name="title"
                        placeholder="title"
                        value={painting.title}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="description">Description</label>
                    </td>
                    <td>
                      <textarea
                      id="edit-description"
                        className="edit-input"
                        onChange={this.props.handleChange}
                        type="text"
                        name="description"
                        value={painting.description}
                        placeholder="description"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Tags</label>
                    </td>
                    <td>
                      <input
                        className="edit-input"
                        onChange={this.props.handleChange}
                        type="text"
                        name="tags"
                        value={painting.tags.join(" ")}
                        placeholder="tags"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button  className="yellowbutton edit-btn">Update</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(PaintingDetails);
