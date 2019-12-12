import React, { Component } from "react";

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
      <form onSubmit={this.props.handleSubmit} className="add-form">
        <input
          className="add-input"
          onChange={this.props.handleChange}
          type="text"
          name="title"
          placeholder="title"
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
        />

        <input
          className="add-input"
          onChange={this.props.handleChange}
          type="text"
          name="tags"
          placeholder="tags"
        />

        <select size="1" className="browser-default  custom-select-lg mb-3">
          <option>Not Started</option>
          <option>In Progess</option>
          <option>Completed</option>
        </select>

        <button>Submit</button>
      </form>
    );
  }
}
