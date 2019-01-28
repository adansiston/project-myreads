import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css'
import BookShelves from './BookShelves'
import Search from './Search'



class BooksApp extends Component {
  render() {
    return (
        <div className="app">
          <Route exact path='/search' render={({ history }) => (
            
             <Search/>
          )}/>

        <Route exact path='/' render={() => (
            <div>
              <BookShelves/>
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