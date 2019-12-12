import React from 'react'

import Navbar from "../components/Navbar"
import ProfileDisplay from "../components/ProfileDisplay"

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state={}
    }
    render(){
        return (
            <div>
                <Navbar/>
                {/* !!! */}
                <ProfileDisplay userId="5deb63889997fe333e0be6d0"/>
            </div>
        )
    }
}
