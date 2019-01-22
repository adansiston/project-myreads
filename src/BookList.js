import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BookList extends Component {

  state = {
    books: [],
    searchedBooks: [],
    query: '',
  }





  updateQuery = (query) => {
    //console.log('111:', query);
    this.setState(
      { query: query.trim() }
      ,this.searchBooks(this.state.query)
      ,console.log('busca:', this.state.query)
    )
  };
  


  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({books}))
        this.setState(() => ({searchedBooks: books}))
      })
  }


  compare(obj, term) {
    //console.log('no compare', term, obj)
    let found = false;
    Object.entries(obj).forEach(entry => {
      let key = entry[0];
      let value = entry[1];
      let word = '';


      if (
        entry[0] === 'subtitle' ||
        entry[0] === 'authors' ||
        entry[0] === 'publisher' ||
        entry[0] === 'description' ||
        entry[0] === 'categories' ||
        entry[0] === 'language' ||
        entry[0] === 'title'
      ) {
        if (Array.isArray(entry[1])) {
          entry[1].forEach(function (entry) {
            //console.log('entry', entry);
            word = entry.toString();
            if (word.toLowerCase().search(term.toLowerCase()) !== -1) {
              found = true;
            }
          });
        } else {
          word = entry[1].toString();
          if (word.toLowerCase().search(term.toLowerCase()) !== -1) {
            found = true;
          }
        }
      }
    });
    return found;
  }

  searchBooks(term) {
    let outros = [];

    this.state.books.map((b) => (
      (this.compare(b, term) && outros.push(b))
    ));

    this.setState({ searchBooks: outros });
    console.log('searchBooks', this.state.searchBooks);
  }

  renderStyle(url) {
    //console.log("came here", url);
    return (
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${url})` }}></div>
    )
  }


  render() {

    return (
      <div>
        <div className="search-books-bar">
          <Link to='/'><button className="close-search">Close</button></Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>


        <ol className='contact-list'>
        {console.log('no loop->', this.state.searchedBooks)}
          {this.state.searchedBooks.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  {this.renderStyle(book.imageLinks.smallThumbnail)}
                  <div className="book-shelf-changer">
                    <select>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>
          ))}
        </ol>


      </div>
    )
  }
}

export default BookList