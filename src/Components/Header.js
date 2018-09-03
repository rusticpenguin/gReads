import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageTitle: 'gReads',
            pageLogo: '../img/book.png',
            error: null,
        }
    };

    render() {
        const { pageTitle, pageLogo, error } = this.state;
        return (
            <header>
                <div class="title">
                    <img class="clickMe" src={require('../img/book.svg')} alt="logo"/>
                    <h1 class="clickMe"> {pageTitle} </h1>
                </div>
            </header>
        )
    }
}

export default Header;