import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
    constructor(props){
        super(props)
        this.state={
            hasError: false
        }
    }
    componentDidCatch(error, info){
        this.setState({hasError:true})
        console.log("ERROR: ", error, info)
    }
    render() {
        return (
            <div>
                {this.state.hasError?<h1>Something went wrong</h1>:this.props.children}
            </div>
        )
    }
}
