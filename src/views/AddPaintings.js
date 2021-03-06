import React from "react";
import Navbar from "../components/Navbar/Navbar";
import AddPaintingForm from "../components/AddPainting/AddPaintingForm";
import { withAuth } from "../lib/AuthProvider";
import paintingService from "../lib/services/painting-service";

class PaintingsAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPainting: {
        title: "",
        description: "",
        image: "",
        tags: [],
        game: "Warhammer 40k"
      }
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    //!!!
    if (this.state.newPainting.title.split("").length < 17) {
      // if (this.state.newPainting.image.split("").length){
        const newPainting = await paintingService.postPainting({
          title: this.state.newPainting.title,
          description: this.state.newPainting.description,
          image: this.state.newPainting.image,
          tags: this.state.newPainting.tags,
          creator: this.props.user._id,
          creatorUsername: this.props.user.username, //!!!
          game: this.state.newPainting.game
        });
        if (newPainting) {
          this.props.history.push(`/painting/${newPainting._id}`);
        }
      // } else {
      //   const errorMessage = document.querySelector("#error-message");
      //   errorMessage.innerHTML = "Image format is not accepted";
      //   errorMessage.classList.remove("hidden");
      // }
    } else {
      const errorMessage = document.querySelector("#error-message");
      errorMessage.innerHTML = "Title must not be longer than 16 characters";
      errorMessage.classList.remove("hidden");
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    const newPaintingCopy = { ...this.state.newPainting };
    newPaintingCopy[name] = value;
    this.setState({ newPainting: newPaintingCopy });
  };

  handleSelectChange = e => {
    var e = document.getElementById("select");
    var value = e.options[e.selectedIndex].value;
    const newPaintingCopy = { ...this.state.newPainting };
    newPaintingCopy["game"] = value;
    this.setState({ newPainting: newPaintingCopy });
  };

  fileChange = event => {
    const file = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append("photo", file);

    paintingService
      .imageUpload(uploadData)
      .then(image => {
        const newPaintingCopy = { ...this.state.newPainting };
        newPaintingCopy.image = image;
        this.setState({ newPainting: newPaintingCopy });
        this.setState({ image });
      })
      .catch(error => console.log(error));
  };

  addTagValue = e => {
    const fakeTagsInput = e.target;
    let fakeTagsInputValue = fakeTagsInput.value;
    const valueArr = fakeTagsInputValue.split("");
    const lastCharacterInInput = valueArr[valueArr.length - 1];
    const firstCharacterInInput = valueArr[0];

    if (firstCharacterInInput === " ") {
      fakeTagsInput.value = "";
      return;
    }
    if (lastCharacterInInput === " ") {
      fakeTagsInputValue = fakeTagsInputValue.split("");
      fakeTagsInputValue.pop();
      fakeTagsInputValue = fakeTagsInputValue.join("");
      if (this.state.newPainting.tags.indexOf(fakeTagsInputValue) !== -1) {
        fakeTagsInput.value = "";
        return;
      }
      const tagsCopy = [...this.state.newPainting.tags, fakeTagsInputValue];
      const newPaintingCopy = { ...this.state.newPainting };
      newPaintingCopy.tags = tagsCopy;
      this.setState({ newPainting: newPaintingCopy });
      fakeTagsInput.value = "";
    }
  };

  deleteTag = tag => {
    const tagsCopy = this.state.newPainting.tags;
    if (tagsCopy.indexOf(tag) !== -1) {
      tagsCopy.splice(tagsCopy.indexOf(tag), 1);
      const newPaintingCopy = { ...this.state.newPainting };
      newPaintingCopy.tags = tagsCopy;
      this.setState({ newPainting: newPaintingCopy });
    }
  };

  render() {
    return (
      <div>
        <Navbar {...this.props} />
        <AddPaintingForm
          handleChange={this.handleChange}
          handleSelectChange={this.handleSelectChange}
          handleSubmit={this.handleSubmit}
          deleteTag={this.deleteTag}
          fileChange={this.fileChange}
          tags={this.state.newPainting.tags}
          addTagValue={this.addTagValue}
          user={this.props.user}
        />
      </div>
    );
  }
}

export default withAuth(PaintingsAdd);
