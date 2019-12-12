import React, { Component } from 'react'
import axios from "axios"

export default class PaintingDetails extends Component {
    constructor(props){
        super(props)
        this.state={
            paintingId: props.paintingId,
            paintingDetails: {}
        }
    }

        //HERE
    componentDidMount(){
        axios.get(`http://localhost:5000/paintings/${this.state.paintingId}`)
            .then(response=>{this.setState({
                paintingDetails: response.data
                })
            })
    }

    render() {
        return (
            <div>
                {!this.state.paintingDetails ? null :
                    this.state.paintingDetails.title
                }
            </div>
        )
    }
}
