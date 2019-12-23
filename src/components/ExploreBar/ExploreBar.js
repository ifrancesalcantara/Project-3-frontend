import React, { Component } from "react";
import "./ExploreBar.css";

export default class ExploreBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getFilteredPaintings = (filter) => {
    this.props.filterPaintings(filter)
    // const searchbar = document.querySelector(".explore-searchbar");
    // this.props.getFilteredPaintings(`?title=${searchbar.value}`);
  };

  sortPaintings = () => {
    const e = document.querySelector(".select");
    const value = e.options[e.selectedIndex].value;
    this.props.sortPaintings(value)
  };

  render() {
    return (
      <div className="exploreBar">
        <div>
          <span>Sort by:</span>
          <select
            name=""
            id=""
            className="select"
            onClick={this.sortPaintings}
          >
            <option defaultValue>Oldest</option>
            <option>Newest</option>
            <option>Most liked</option>
            <option>Most seen</option>
            {/* <option>Trending</option> */}
          </select>
        </div>
        <div>
          <input 
          className="explore-searchbar" 
          onChange={(e)=>this.getFilteredPaintings(e.target.value)}
          type="text" placeholder="Search by title"/>
          <img
            onMouseOver={()=>this.getFilteredPaintings}
            onMouseOut={this.getFilteredPaintings}
            onClick={()=>{this.getFilteredPaintings()}}
            id="search-magnifying-glass"
            src="https://img.icons8.com/ios-glyphs/60/000000/search.png"
            alt=""
          />
        </div>
        
            {/* this.getFilteredPaintings()} */}
      </div>
    );
  }
}
