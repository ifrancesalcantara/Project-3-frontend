import React, { Component } from 'react'

import Navbar from "../components/Navbar"
import PaintingDetails from "../components/PaintingDetails"


export default class Painting extends Component {
    constructor(props) {
        super(props)
        this.state={}
    }
    render() {
        return (
            <div>
                <Navbar />
                <PaintingDetails paintingId={this.props.match.params.paintingId}/>
            </div>
        )
    }
}
