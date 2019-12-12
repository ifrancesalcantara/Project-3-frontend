import React from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import PaintingList from "../components/PaintingList";


export default class Home extends React.Component {
    constructor(){
        super()
        this.state={}
    }
    
    getHomePaintings = () => {
      axios
        .get("http://localhost:5000/paintings/home")
            .then(response => {
                this.setState({paintings: response.data})
            })
            .catch(err => {
                console.log(err)});
    };

    componentDidMount(){
        this.getHomePaintings()
    }

    render(){
        return (
          <div>
            <Navbar />
    
            {!this.state.paintings ? null :
                <PaintingList paintings={this.state.paintings} />
            }
          </div>
        );
    }
}
