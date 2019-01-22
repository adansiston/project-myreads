import React, { Component } from 'react';
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import './App.css'
import BookCurrentList from './BookCurrentList'
import AddBook from './AddBook'



class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    return (
        <div className="app">
          <Route exact path='/create' render={({ history }) => (
            <AddBook/>
          )}/>

        <Route exact path='/' render={() => (
            <div>
              <BookCurrentList/>
              <div className="open-search">
              <Link to='/create'><button>Add a book</button></Link>
              </div>
            </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp