import React from 'react'
import axios from 'axios'

import Navbar from "../components/Navbar"
import AddPaintingForm from "../components/AddPaintingForm"



export default class PaintingsAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            newPainting: {
                title: "",
                description: "",
                image: "",
                tags: []
            }
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target
        const newPaintingCopy = {...this.state.newPainting}
        newPaintingCopy[name] = value
        this.setState({ newPainting: newPaintingCopy })
    }

    handleSubmit= (e)=> {
        e.preventDefault()
        //!!!
        const userId = "5deb63889997fe333e0be6d0"
        axios.post(`http://localhost:5000/paintings`,
        {
            title: this.state.newPainting.title,
            description: this.state.newPainting.description,
            image: this.state.newPainting.image,
            tags: this.state.newPainting.tags,
            creatorId: userId,
            creatorUsername: "pepito",
            date: new Date()
        })
    }

    render(){
        return (
            <div>
                <Navbar/>
                <AddPaintingForm 
                    handleChange={this.handleChange} 
                    handleSubmit={this.handleSubmit}
                />
            </div>
        )
    }
}
