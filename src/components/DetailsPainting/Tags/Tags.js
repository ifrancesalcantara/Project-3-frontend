import React, { Component } from 'react';
import { Link } from "react-router-dom";
import shortid from "shortid";

import Tag from "./../../AddPainting/Tag";

export default class Tags extends Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render() {
        const { tags } = this.props
        return (
            <div className="details-tags-wrapper">
              {!tags
                ? null
                : tags.map(tag => (
                    <Link key={shortid.generate()} to={`/?tag=${tag}`}>
                      <Tag text={tag}></Tag>
                    </Link>
                  ))}
            </div>
        )
    }
}
