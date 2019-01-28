import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import ShowBook from './ShowBook';
//import { Link } from 'react-router-dom'

class BookShelves extends Component {
  state = {
    books: [],
  }
  bookList = [];

  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
        console.log('aaaaaaaaaaaaaaatualizados all', books);
        this.setState(() => ({ books: books }))
        this.bookList = books;
    })
  }

  renderStyle(url) {
    return (
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${url})` }}></div>
    )
  }

  change = event => {
    let status = event.target.value;
    let bookId = event.target.id;

    var bookAux = this.bookList.find(function (b) {
      return b.id === bookId
    });

    bookAux.shelf = status;

    BooksAPI.update(bookAux, status)
      .then((res) => {
        BooksAPI.getAll()
        .then((books) => {
            //console.log('atualizados all', books);
            this.setState(() => ({ books: books }))
        })
      });
  }

  render() {
    console.log('1');
    this.bookList = this.state.books;
    console.log('2');
    
    this.bookList.map((b) => {
      if (typeof (b.imageLinks) === "undefined") {
        b.imageLinks = BooksAPI.noImage;
      }
      if (typeof (b.authors) === "undefined") {
        b.authors = ['No Authors']
      }
    });
    console.log('3');
    const categories = ['currentlyReading', 'wantToRead', 'read'];

    console.log('4', this.state.books);
    if (this.bookList.length < 1 || this.bookList.length == undefined) {
      this.bookList= [];
    }
    console.log('saiu this.bookList', this.bookList);
    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                {categories.map((cat) => {
                  return (
                    <div key={cat}>
                      <h2 className="bookshelf-title">{cat === 'currentlyReading' ? 'Currently Reading' : cat === 'wantToRead' ? 'Want To Read' : 'Read'}</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          {this.bookList.map((book) => {
                            return (book.shelf === cat &&
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
                      </div>
                    </div>)
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelves