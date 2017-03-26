import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Router, Route } from 'react-router';
import History from 'history/lib/createHashHistory';
import RouterTransition from 'ph-router-transition';

import Detail from './detail.js';
import About from './about.js';

let Index = class Index extends Component {
    render() {
        return (
            <div className="index-wrapper ph-transition-index">
                <header>
                    ph-router-transition
                </header>
                <ul className="index-menu">
                    <li><a href="#/detail">Detail</a></li>
                    <li><a href="#/about">About</a></li>
                </ul>
            </div>
        );
    }
}

const PageTransition = class PageTransition extends Component{
    loadedCallback(){
        // 切换结束的回调函数
    }

    render(){
        return (
            <RouterTransition {...this.props} transitionName="slide-left" loadedCallback={::this.loadedCallback}>
                {this.props.children}
            </RouterTransition>
        )
    }
}

let AppRouter = class AppRouter extends Component {
    constructor(props, context) {
        super(props, context);
        this.history = new History({
            queryKey: false
        });
    }

    render() {
        return (
            <Router history={this.history}>
                <Route component={PageTransition}>
                    <Route path="/index" name="index" component={Index} />
                    <Route path="/detail" name="detail" component={Detail} />
                    <Route path="/about" name="about" component={About} />
                    <Redirect from="/" to="/index" />
                </Route>
            </Router>
        );
    }
};

let App = class App extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <AppRouter />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

