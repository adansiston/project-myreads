import React, { Component } from 'react';
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import './App.css'
import BookShelves from './BookShelves'
import AddBook from './AddBook'



class BooksApp extends Component {
  state = {
    books: [],
  }

  handleChangeList = (books) => {
    this.setState({ books: books });
  }

  render() {
    return (
        <div className="app">
          <Route exact path='/search' render={({ history }) => (
            <AddBook />
          )}/>

        <Route exact path='/' render={() => (
            <div>
              <BookShelves books={this.state.books}/>
              <div className="open-search">
              <Link to='/search'><button>Add a book</button></Link>
              </div>
            </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp