import React, { Component } from 'react';

class EditForm extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        let uid = this.props.value;

        let bookData = {};

        if (data.get("title")){
            bookData.title = data.get("title");
        };
        if (data.get("bookGenre")){
            bookData.bookGenre = data.get("bookGenre");
        };
        if (data.get("bookDescription")){
            bookData.bookDescription = data.get("bookDescription");
        };
        if (data.get("bookCoverURL")){
            bookData.bookCoverURL = data.get("bookCoverURL");
        };
        if (data.get("Author1firstname")){
            bookData.authors = [];
            for(let i = 0; i < 3; i++){
                if (data.get(`Author${i + 1}firstname`)){
                    bookData.authors.push(data.get(`Author${i + 1}firstname`) + " " + data.get(`Author${i + 1}lastname`))
                }
            }
        }
        fetch(`https://gread-backend.herokuapp.com/books/${uid}`, {
            method: 'PUT',
            body: JSON.stringify(bookData),
            headers: new Headers({ "Content-Type": "application/json" })
        })
        .then(res => res.json())
    }

    render() {
        return (
            <form className="submitForm" onSubmit={this.handleSubmit}>
                <label> Book Title: </label>
                <input type="text" name="title" />
                <label> Book Genre: </label>
                <input type="text" name="bookGenre" />
                <label> Book Description: </label>
                <input type="text" name="bookDescription" />
                <label> Book Cover URL: </label>
                <input type="text" name="bookCoverURL" />
                <label> Author 1's First Name: </label>
                <input type="text" name="Author1firstname" />
                <label> Author 1's Last Name: </label>
                <input type="text" name="Author1lastname" />
                <label> Author 1's Biography: </label>
                <input type="text" name="Author1biography" />
                <label> Author 1's Portrait: </label>
                <input type="text" name="Author1portrait" />
                <label> Author 2's First Name: </label>
                <input type="text" name="Author2firstname" />
                <label> Author 2's Last Name: </label>
                <input type="text" name="Author2lastname" />
                <label> Author 2's Biography: </label>
                <input type="text" name="Author2biography" />
                <label> Author 2's Portrait: </label>
                <input type="text" name="Author2portrait" />
                <label> Author 3's First Name: </label>
                <input type="text" name="Author3firstname" />
                <label> Author 3's Last Name: </label>
                <input type="text" name="Author3lastname" />
                <label> Author 3's Biography: </label>
                <input type="text" name="Author3biography" />
                <label> Author 3's Portrait: </label>
                <input type="text" name="Author3portrait" />
                <button className="submit">Send data!</button>
            </form>
        );
    }
}

export default EditForm
