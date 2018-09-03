import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageTitle: 'gReads',
        }
    };

    render() {
        const { pageTitle } = this.state;
        return (
            <header>
                <div className="title">
                    <img className="clickMe" src={require('../img/book.svg')} alt="logo"/>
                    <h1 className="clickMe"> {pageTitle} </h1>
                </div>
            </header>
        )
    }
}

export default Header;