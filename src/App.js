import React, { Component } from 'react';
import Modal from 'react-modal';
import './App.css';


import Header from './Components/Header';
import Footer from './Components/Footer';
import SubmitForm from './Components/SubmitForm'
import EditForm from './Components/EditForm'

const PATH_BASE  = 'https://gread-backend.herokuapp.com/';
const PATH_SEARCH = 'books'
const PARAM_SELECTION = "";

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

Modal.setAppElement('#root')

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: '',
      modalIsOpen1: false,
      modalIsOpen2: false,
      editTarget: "",
    };

    this.openModal1 = this.openModal1.bind(this);
    this.afterOpenModal1 = this.afterOpenModal1.bind(this);
    this.closeModal1 = this.closeModal1.bind(this);
    this.openModal2 = this.openModal2.bind(this);
    this.afterOpenModal2 = this.afterOpenModal2.bind(this);
    this.closeModal2 = this.closeModal2.bind(this);
    this.setSearchDatabase = this.setSearchDatabase.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  openModal1() {
    this.setState({modalIsOpen1: true});
  }

  afterOpenModal1() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#222';
  }

  closeModal1() {
    this.setState({modalIsOpen1: false});
  }

  openModal2(id) {
    this.setState({editTarget: id});
    this.setState({modalIsOpen2: true});
  }

  afterOpenModal2() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#222';
  }

  closeModal2() {
    this.setState({modalIsOpen2: false});
  }

  setSearchDatabase(result) {
    this.setState({ result });
  }

  componentDidMount() {
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

  onSubmit(formData){
    console.log(formData)

    this.preventDefault();
    
  }

  render() {
    const { searchTerm, result } = this.state;

    if (!result) { return null;}
    return (
      <div className="page">
        <Header />
        <div className="interactions">
          <div>
            <button className="submitBook" onClick={this.openModal1}>Submit A Book</button>
            <Modal
              isOpen={this.state.modalIsOpen1}
              onAfterOpen={this.afterOpenModal1}
              onRequestClose={this.closeModal1}
              contentLabel="Submit Modal"
            >
                <h2 className="center" ref={subtitle => this.subtitle = subtitle}>Submit A Book</h2>
                <button className="floatRight" onClick={this.closeModal1}>close</button>
              <SubmitForm />
            </Modal>
            <Modal
              isOpen= {this.state.modalIsOpen2}
              onAfterOpen={this.afterOpenModal2}
              onRequestClose={this.closeModal2}
              contentLabel="Edit Modal"
            >
                <h2 className="center" ref={subtitle => this.subtitle = subtitle}>Edit A Book</h2>
                <button className="floatRight" onClick={this.closeModal2}>close</button>
              <EditForm
                value = {this.state.editTarget}
              />
          </Modal>
        </div>
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
          openModal2={this.openModal2}
        />
        <Footer />
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) =>
    <form>
      {children} <input
        type="text"
        onChange={onChange}
      />
    </form>


const Table = ({ list, pattern, onDelete, openModal2 }) =>

  <div className="table">
    {list.filter(isSearched(pattern)).map(item =>
      <div key={item._id} className="table-row">
        <img className="cover" src={item.bookCoverURL} alt={item.title + " Cover"} />
        <div className="largecolumn">
          <a href={item.url} className="bookTitle">{item.title}</a>
          <div>
            <label>Authors:</label>
            <ul>
              {item.authors.map((persons, index) =>
                <li key={index.toString()}>{persons}</li>)}
            </ul>
          </div>
        </div>
        <div className="midcolumn">
          <p className="description line-clamp"> {item.bookDescription} </p>
        </div>
        <label className="smallcolumn">Genre: {item.bookGenre}</label>
        <label className="smallcolumn">
          {item.points}
        </label>
        <label className="smallcolumn">
        <button className="submitBook" onClick={() => openModal2(item._id)}>Edit</button>

          <Button
            onClick={() => onDelete(item._id)} className="delete"
          >
            Delete
          </Button>
        </label>
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
