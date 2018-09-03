import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            footerText: 'A full-stack react-app with mongoDB backend created by George Chios under the MIT License © 2018.',
            disclaimer: `This website uses art created by Benny Forsberg, from The Noun Project, under the `,
        }
    };

    render() {
        const { footerText, disclaimer } = this.state;
        return (
            <footer>
                <span> {footerText} </span>
                <span> {disclaimer} <a href="https://creativecommons.org/licenses/by/3.0/deed.en"> Creative Commons Attribution 3.0 Unported License </a> </span>
            </footer>
        )
    }
}

export default Footer;