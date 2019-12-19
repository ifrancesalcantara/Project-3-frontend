import React, { Component } from "react";
import shortid from "shortid";
import "./AddPaintingForm.css";

import Tag from "./Tag";

export default class AddPaintingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      image: "",
      tags: []
    };
  }



  render() {
    return (
      <div className="add-painting-form">
        <h1>Add a new style cards</h1>
        <p id="error-message" style={{color: "red"}} className="hidden">
          Error mesage
        </p>
        <form onSubmit={this.props.handleSubmit} className="add-form">
          <input
            className="add-input"
            onChange={this.props.handleChange}
            type="text"
            name="title"
            placeholder="Title"
            required
          />

          <textarea
            className="add-description"
            onChange={this.props.handleChange}
            type="text"
            name="description"
            placeholder="Description"
          />

          <input
            type="file"
            name="image"
            onChange={e => this.props.fileChange(e)}
            id="file"
          />
          <label for="file" className="btn-3">
            <span>Upload</span>
          </label>
          <span>or</span>
          <input
          onChange={this.props.handleChange}
            id="signup-img-link"
            className="signup-input"
            name="image"
            placeholder="Link an image (Sketchfab OK)"
          />

          <div id="add-tags-display">
          {!this.props.tags.length
            ? null
            : this.props.tags.map(tag => {
                return <Tag view="add-form" key={shortid.generate()}deleteTag={()=>this.props.deleteTag(tag)} text={tag}></Tag>;
              })}
              </div>
          <input
            className="add-input add-tags-fake"
            onChange={this.props.addTagValue}
            type="text"
            name="tags"
            placeholder="Tags (separated with spaces)"
          />

          <select
            id="select"
            size="1"
            name="game"
            onChange={this.props.handleSelectChange}
            className="browser-default  custom-select-lg mb-3 select"
          >
            <option>Warhammer 40k</option>
            <option>Warhammer Fantasy</option>
            <option>Legends of the Old West</option>
          </select>

          <button className="yellowbutton add-btn">Submit</button>
        </form>
      </div>
    );
  }
}
