import React, { Component } from "react";
import "./AddPaintingForm.css"

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
            <h1>Add a new painting</h1>
            <p id="error-message" className="hidden">Error mesage</p>
      <form onSubmit={this.props.handleSubmit} className="add-form">
        <input
          className="add-input"
          onChange={this.props.handleChange}
          type="text"
          name="title"
          placeholder="title"
          required
        />

        <textarea
          className="add-input"
          onChange={this.props.handleChange}
          type="text"
          name="description"
          placeholder="description"
        />

        <input
          className="add-input"
          type="file"
          name="image"
          onChange={e => this.props.fileChange(e)}
          required
        />

        <input
          className="add-input"
          onChange={this.props.handleChange}
          type="text"
          name="tags"
          placeholder="tags"
        />

        <select
        id="select"
          size="1"
          name="game"
          onChange={this.props.handleSelectChange}
          className="browser-default  custom-select-lg mb-3"
        >
          <option>Warhammer 40k</option>
          <option>Warhammer Fantasy</option>
          <option>Legends of the Old West</option>
        </select>

        <button>Submit</button>
      </form>
      </div> 
    );
  }
}
