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
    this.books = this.props.books;
    BooksAPI.getAll()
      .then((allBooks) => {
        this.setState({ searchedBooks: allBooks },
        );
        this.forceUpdate();
      })
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
    this.searchBooks(query);
  };

  searchBooks(term) {
    if (term === '') {
      this.setState({ searchedBooks: [] });
    } else {
      BooksAPI.search(term)
        .then((books) => {
          let stateBooks = this.books;
          for (let j = 0; j < books.length; j++) {
            for (let i = 0; i < stateBooks.length; i++) {
              if (books[j].id === stateBooks[i].id) {
                books[j] = stateBooks[i];
              }
            }
          }
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
        //Não estou conseguindo atualizar o backend.
        console.log('res', res);
      });


      BooksAPI.getAll()
        .then((books) => {
            console.log('atualizados all', books);
        })




    let searchedBooksAux = this.state.searchedBooks;
    let bookChanged;
    for (let i = 0; i < searchedBooksAux.length; i++) {
      if (searchedBooksAux[i].id === bookId) {
        searchedBooksAux[i].shelf = status;
        bookChanged = searchedBooksAux[i];
      }
    }
    this.setState({ searchedBooks: searchedBooksAux });

    let books = this.books;
    if (!this.containsBook(bookChanged, this.books)) {
      books.push(bookChanged);
    } else {
      for (var i = 0; i < books.length; i++) {
        if (books[i].id === bookChanged.id) {
          books[i].shelf = bookChanged.shelf;
        }
      }
    }
    this.books = books
    this.props.updateBooList(this.books);
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