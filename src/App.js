import React, { Component } from 'react';
import './App.css';

class Developer {
  constructor(firstname, lastname){
    this.firstname = firstname;
    this.lastname = lastname;
  }
  getName() {
    return this.firstname + ' ' + this.lastname;
  }
}

const george = new Developer('big', 'money');
console.log(george.getName());

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'http://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
    }
    
    this.logThis = this.logThis.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  logThis(data) {
    console.log(data);
  }
  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList})
  }

  render() {
    return (
      <div className="App">
        {this.state.list.map(item =>
            <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.authors}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <button 
                  onClick={() => this.onDismiss(item.objectID)}
                  type="button"
                >
                  Dismiss
                </button>
              </span>
            </div>
        )}
      </div>
    );
  }
}

export default App;
