import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'


class Search extends Component {

  state = {
    query: '',
    searchedBooks: [],
  }

  books = [];
  noResults = false;


  componentDidMount() {

    BooksAPI.getAll()
      .then((allBooks) => {
        this.setState({ searchedBooks: allBooks },
        );
        this.forceUpdate();
        this.books = this.state.searchedBooks;
      })
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
    this.searchBooks(query);
  };

  searchBooks(term) {
    if (term === '') {
      BooksAPI.getAll()
      .then((allBooks) => {
        this.setState({ searchedBooks: allBooks },
        );
        this.forceUpdate();
        this.books = this.state.searchedBooks;
      })
    } else {
      BooksAPI.search(term)
        .then((books) => {
          this.setState({ searchedBooks: books });
        })
    }
  }

  renderStyle(url) {
    return (
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${url})` }}></div>
    )
  }



  change = event => {
    let status = event.target.value;
    let bookId = event.target.id;

    var bookAux = this.state.searchedBooks.find(function (b) {
      return b.id === bookId
    });

    bookAux.shelf = status;


    BooksAPI.update(bookAux, status)
      .then((res) => {
        console.log('res', res);
       });

  }

  containsBook(book, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].id === book.id) {
        return true;
      }
    }
    return false;
  }



  render() {


    let searchedBooks = this.state.searchedBooks;
    if (searchedBooks.length < 1 || searchedBooks.length == undefined) {
      searchedBooks = [];
      this.noResults = true;
    } else {
      this.noResults = false;
    }
    searchedBooks.map((b) => {
      if (typeof (b.imageLinks) === "undefined") {
        b.imageLinks = BooksAPI.noImage;
      }
      if (typeof (b.authors) === "undefined") {
        b.authors = ['No Authors']
      }
    });

    return (
      <div>
        <div className="search-books-bar">
          <Link to='/'><button className="close-search">Close</button></Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or authors"
              value={this.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>

        {!this.noResults ? (

          <ol className='contact-list'>
            {searchedBooks.map((book) => {
              return (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      {this.renderStyle(book.imageLinks.smallThumbnail)}
                      <div className="book-shelf-changer">
                        <select id={book.id} onChange={this.change} value={this.state.value} defaultValue={book.shelf}>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors.map((author) => {
                      return (
                        <div key={author} className="book-authors">
                          {author}<br></br>
                        </div>
                      )
                    })}
                  </div>
                </li>
              )
            })}
          </ol>

        ) : (

            this.state.query === '' ? (
              <div style={{ margin: '40px' }}>
                <h2>Type a word for search a especific book.</h2>
              </div>
            ) : (
                <div style={{ margin: '40px' }}>
                  <h2>No books found.</h2>
                </div>
              )
          )}
      </div>
    )
  }
}

export default Search