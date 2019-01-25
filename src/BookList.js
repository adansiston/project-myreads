import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'


class BookList extends Component {

  state = {
    books: [],
    query: '',
    searchedBooks: [],
  }

  noResults = false;


  componentDidMount() {
    this.setState({ books: this.props.books });
    BooksAPI.getAll()
      .then((allBooks) => {
        this.setState({ searchedBooks: allBooks },


          //tentativa de deixar uma lista inicial (pega no getAll da API), porém,
          // já com o shelf correto, o que modificado anteriormente.
          // pelo console.log aparece certinho, mas nao consigo fazer com que 
          // a opção inicial do botão volta para a padrão.
          // Para os livros buscados pela função search da API a opção shelf inicial fica
          // certinho, eu consigo modificar.
          () => {
            let stateBooks = this.props.books;
            let books = this.state.searchedBooks;
            if (stateBooks.length > 1) {
              for (let j = 0; j < books.length; j++) {
                for (let i = 0; i < stateBooks.length; i++) {
                  if (books[j].id === stateBooks[i].id) {
                    books[j] = stateBooks[i];
                  }
                }
              }
              this.setState({ searchedBooks: books });
            }
          }


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
          let stateBooks = this.state.books;
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

    var bookAux = this.state.searchedBooks.filter(function (b) {
      return b.id === bookId
    });

    bookAux.shelf = status;

    BooksAPI.update(bookAux, status)
      .then((res) => {
        //Não estou conseguindo atualizar o backend.
        //console.log('res', res);
      });

    let searchedBooksAux = this.state.searchedBooks;
    let bookChanged;
    for (let i = 0; i < searchedBooksAux.length; i++) {
      if (searchedBooksAux[i].id === bookId) {
        searchedBooksAux[i].shelf = status;
        bookChanged = searchedBooksAux[i];
      }
    }
    this.setState({ searchedBooks: searchedBooksAux });

    let books = this.state.books;
    if (!this.containsBook(bookChanged, this.state.books)) {
      books.push(bookChanged);
    } else {
      for (var i = 0; i < books.length; i++) {
        if (books[i].id === bookChanged.id) {
          books[i].shelf = bookChanged.shelf;
        }
      }
    }
    this.setState({ books: books });
    this.props.updateBooList(this.state.books);
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
        b.imageLinks = { smallThumbnail: 'data:image/jpeg;base64,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' };
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

export default BookList