import React, { Component } from 'react';
//import { Link } from 'react-router-dom'
import Search from './Search'

class AddBook extends Component {

  state = {
    books: [],
  }

  render() {

    return (
      <div className="search-books">
        <Search/>
      </div>
    )
  }
}

export default AddBook