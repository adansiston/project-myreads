import React, { Component } from 'react';
//import { Link } from 'react-router-dom'
import BookList from './BookList'

class AddBook extends Component {

  state = {
    books: [],
  }

  handleChangeList = (books) => {
    this.setState({ books: books });
    this.props.updateBooList(books);
  }

  render() {

    return (
      <div className="search-books">
      
        <BookList 
          updateBooList={(books) => {
            this.handleChangeList(books)
          }}
          books={this.props.books}
        />
      </div>
    )
  }
}

export default AddBook