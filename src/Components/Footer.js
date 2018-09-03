import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disclaimer: `This website uses art created by Benny Forsberg, from The Noun Project, under the `,
            error: null,
        }
    };

    render() {
        const { footerText, disclaimer, error } = this.state;
        return (
            <footer>
                <span> {disclaimer} <a href="https://creativecommons.org/licenses/by/3.0/deed.en"> Creative Commons Attribution 3.0 Unported License </a> </span>
            </footer>
        )
    }
}

export default Footer;