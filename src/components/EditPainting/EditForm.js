import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
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
              <img src={painting.image} alt="" />
            ) : (
              <div class="sketchfab-embed-wrapper">
                <iframe
                  title="A 3D model"
                  width="640"
                  height="480"
                  src="https://sketchfab.com/models/ea5f9b5e738946e48ef9618c98a51668/embed"
                ></iframe>
              </div>
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
                        value={painting.tags}
                        placeholder="tags"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button>Update</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(PaintingDetails);
