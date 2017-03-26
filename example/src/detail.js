import React, { Component } from 'react';

export default class Detail extends Component {
    constructor(props, context){
        super(props, context);
    }

    shouldComponentUpdate(){
        return false;
    }

    render(){
        return (
            <div className="detail-wrapper">
                <a className="back" href="#/index">Back</a>
                <div>
                    <h3>Detail</h3>
                    <p>I'm detail page...</p>
                </div>
                <a className="jump" href="#/about">Jump To About Page</a>
            </div>
        )
    }
}
