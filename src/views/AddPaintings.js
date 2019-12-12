import React from 'react'
import axios from 'axios'

import Navbar from "../components/Navbar/Navbar"
import AddPaintingForm from "../components/AddPaintingForm"
import { withAuth } from "../lib/AuthProvider"
import paintingService from '../lib/services/painting-service';


class PaintingsAdd extends React.Component {
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
    
        handleSubmit= (e)=> {
            e.preventDefault()
            //!!!
            paintingService.postPainting({
                title: this.state.newPainting.title,
                description: this.state.newPainting.description,
                image: this.state.newPainting.image,
                tags: this.state.newPainting.tags,
                creator: this.props.user._id,
                creatorUsername: this.props.user.username, //!!!
            })
        }

    handleChange = (e) => {
        const { name, value } = e.target
        const newPaintingCopy = {...this.state.newPainting}
        newPaintingCopy[name] = value
        this.setState({ newPainting: newPaintingCopy })
    }

    fileChange = (event) => {    
        const file = event.target.files[0];
        const uploadData = new FormData()
        uploadData.append('photo', file)
    
        paintingService.imageUpload(uploadData)
        .then((image) => {
            const newPaintingCopy = {...this.state.newPainting}
            newPaintingCopy.image = image
            this.setState({ newPainting: newPaintingCopy })
            this.setState({image})
        })
        .catch((error) => console.log(error))
      }

    render(){
        return (
            <div>
                <Navbar/>
                <AddPaintingForm 
                    handleChange={this.handleChange} 
                    handleSubmit={this.handleSubmit}
                    fileChange={this.fileChange}
                    user={this.props.user}
                />
            </div>
        )
    }
}

export default withAuth(PaintingsAdd)