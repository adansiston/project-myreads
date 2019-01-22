import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import BookList from './BookList'

class AddBook extends Component {

  state = {
    books: [],
  }



  render() {

    return (
      <div className="search-books">
      
        <BookList/>
      </div>
    )
  }
}

export default AddBook