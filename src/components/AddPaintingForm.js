import React, { Component } from 'react'

export default class AddPaintingForm extends Component {
    constructor(props){
        super(props)
        this.state={}
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <input 
                    onChange={this.props.handleChange}
                    type="text" 
                    name="title" 
                    placeholder="title"
                />

                <textarea 
                    onChange={this.props.handleChange}
                    type="text" 
                    name="description" 
                    placeholder="description"
                />

                <input 
                    onChange={this.props.handleChange}
                    type="text" 
                    name="image" 
                    placeholder="image"
                />

                <input 
                    onChange={this.props.handleChange}
                    type="text" 
                    name="tags" 
                    placeholder="tags"
                />.

                <button>Submit</button>
            </form>
        )
    }
}
