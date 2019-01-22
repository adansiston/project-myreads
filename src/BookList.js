import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BookList extends Component {

  state = {
    books: [],
    searchedBooks: []
  }

  
  

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
        console.log('livros', this.state.books);
        this.searchBooks('li');
      })
  }


  compare(obj, term){
    let found = false;
    Object.entries(obj).forEach(entry => {
      let key = entry[0];
      let value = entry[1];
      let word = '';
      
      if (Array.isArray(entry[1])){
        entry[1].forEach(function(entry) {
          //console.log('entry', entry);
          word = entry.toString();
          if (word.toLowerCase().search(term.toLowerCase()) !== -1){
            found = true;
          }
        });
      } else {
        word = entry[1].toString();
        if (word.toLowerCase().search(term.toLowerCase()) !== -1){
          found = true;
        }
      }
    });
    //console.log('resultado = ', found);
  }

  searchBooks(term){
    let outros = [];

    //var i;
    //for (i = 0; i < this.state.books.length; i++) { 
    //  let b = this.state.books[i];
      
    //  if(this.compare(b, term)){
    //    outros.push(b);
    //  }
    //}

    //this.state.books.map(function(b){
    //    if(this.compare(b, term)){
    //      outros.push(b);
    //    }
    //  });

    //let outros = this.state.books.filter(function(book){
    //  return (this.compare(book, term) && book);
    //});
    console.log('outros', outros);
  }

  renderStyle(url) {
    //console.log("came here", url);
    return (
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${url})` }}></div>
    )
  }


  render() {

    let books = this.state.books;

    return (
      <div>
        <ol className='contact-list'>
          {books.map((book) => (
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