import React, { Component, PropTypes } from "react";
import "./ChatForm.css";
// import { bindActionCreators } from "react-redux"
// import { connect } from "react-redux";

export default class ChatMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: {
        creatorUsername: this.props.user.username, // this.props.user.username,
        creatorId: this.props.user._id, //this.props.user._id,
        commentText: "",
        commentImage: ""
      }
    };
  }

  // static propTypes = {
  //   comment: this.PropTypes.object.isRequired
  // }

  componentDidMount() {
    const allInputs = document.querySelectorAll("input");
    const textInput = allInputs[0];
    const qtyInput = allInputs[1];
    
    document.querySelector(".show-chatform2").addEventListener("click", () => {
      document.querySelector(".chatform2").classList.toggle("hidden");
    });
    document.querySelector("#showform2").addEventListener("click", () => {
      document.querySelector(".invoiceform").classList.remove("hidden");
      document.querySelector(".chatform2").classList.add("hidden");
    });
    document
      .querySelector(".close-incoiceform")
      .addEventListener("click", () => {
        document.querySelector(".invoiceform").classList.add("hidden");
      });
    document.addEventListener("keydown", e => {
      if ((e.code === "Enter"||e.code==="NumpadEnter") && (textInput==document.activeElement||qtyInput==document.activeElement)) {
        console.log(textInput);
      }
    });
  }

  handleChange = e => {
    const { name, value } = e.target;
    const newCommenCopy = { ...this.state.newComment };
    newCommenCopy[name] = value;
    this.setState({ newComment: newCommenCopy });
  };

  preventDefaultAndSendComment = e => {
    e.preventDefault();
    if (this.state.newComment.commentText !== "") {
      this.props.sendComment(this.state.newComment);
      const newCommenCopy = { ...this.state.newComment };
      newCommenCopy.commentText = "";
      this.setState({ newComment: newCommenCopy });
    }
  };

  render() {
    return (
      <div>
        <div className="invoiceform hidden">
          <div>
            <p className="close-incoiceform">x</p>
            <div>
              <input></input>
              <p>x</p>
              <input></input>
              <p>€ x</p>
              <input value="1" style={{textAlign:"center"}}></input>
              <p>=</p>
              <p></p>
            </div>
          </div>
        </div>
        <div className="chatform2 hidden">
          <p id="showform2" >+ INVOICE</p>
        </div>
        <form
          onSubmit={e => this.preventDefaultAndSendComment(e)}
          className="chatform"
        >
          <div className="show-chatform2 hidden">+</div>
          <input
            type="text"
            name="commentText"
            onChange={this.handleChange}
            value={this.state.newComment.commentText}
          />
          <input
            type="submit"
            value="Send"
            className="yellowbutton chat-send-btn"
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comment: state
});

// export default connect(mapStateToProps)(ChatMain)
