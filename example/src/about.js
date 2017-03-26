import React, { Component } from 'react';

export default class About extends Component {
    constructor(props, context){
        super(props, context);
    }

     shouldComponentUpdate(){
        return false;
    }

    render(){
        return (
            <div className="about-wrapper">
                <a className="back" href="#/index">Back</a>
                <p>About Page.</p>
                <div>
                    <h3>About</h3>
                    <p>I'm about page...</p>
                </div>
                <a className="jump" href="#/detail">Jump To Detail Page</a>
            </div>
        )
    }
}
