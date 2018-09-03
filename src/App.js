import React, { Component } from 'react';
import './App.css';

import Header from './Components/Header';
import Footer from './Components/Footer';

const DEFAULT_QUERY = '';

const PATH_BASE  = 'https://gread-backend.herokuapp.com/';
const PATH_SEARCH = 'books'
const PARAM_SELECTION = "";

const url = `${PATH_BASE}${PATH_SEARCH}/${PARAM_SELECTION}`;

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: '',
      totalBooks: 0,
    };

    this.setSearchDatabase = this.setSearchDatabase.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  setSearchDatabase(result) {
    this.setState({ result });
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}/${PARAM_SELECTION}`)
      .then(res => res.json())
      .then(res => this.setSearchDatabase(res))
      .catch(err => err)
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onDelete(id) {
    const isNotId = item => item._id !== id;
    const updatedHits = this.state.result.foundBooks.filter(isNotId);
    fetch(`${PATH_BASE}${PATH_SEARCH}/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(console.log)
    this.setState({ 
      result: Object.assign({}, this.state.result, { foundBooks : updatedHits })
    });
  }

  render() {
    const { searchTerm, result, totalBooks } = this.state;

    if (!result) { return null;}
    return (
      <div className="page">
        <Header />
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
          >
            Search
          </Search>
        </div>
        <Table
          list={ result.foundBooks }
          pattern={searchTerm}
          onDelete={this.onDelete}
        />
        <Footer />
      </div>
    );
  }
}

const Search = ({ value, onChange, onSubmit, children }) =>
    <form onSubmit={onSubmit}>
      {children} <input
        type="text"
        onChange={onChange}
      />
    </form>


const Table = ({ list, pattern, onDelete }) =>

  <div className="table">
    {list.filter(isSearched(pattern)).map(item =>
      <div key={item._id} className="table-row">
        <img className="cover" src={item.bookCoverURL} alt={item.title + " Cover"} />
        <div className="largecolumn">
          <a href={item.url} className="bookTitle">{item.title}</a>
          <div>
            <span>Authors:</span>
            <ul>
              {item.authors.map(persons =>
                <li key={item.authors.value}>{persons}</li>)}
            </ul>
          </div>
        </div>
        <div className="midcolumn">
          <p className="description line-clamp"> {item.bookDescription} </p>
        </div>
        <span className="smallcolumn">Genre: {item.bookGenre}</span>
        <span className="smallcolumn">
          {item.points}
        </span>
        <span className="smallcolumn">
          <Button
            onClick={() => onDelete(item._id)} className="delete"
          >
            Delete
          </Button>
        </span>
      </div>
    )}
  </div>

class Button extends Component {
  render() {
    const {
      onClick,
      className = '',
      children,
    } = this.props;
    return (
      <button
        onClick={onClick}
        className={className}
        type="button"
      >
        {children}
      </button>
    );
  }
}

export default App;
