import React, { Component } from 'react';


class ShowBook extends Component {


  componentDidMount() {
    console.log('book', this.props.book);
  }

  componentWillMount() {
    console.log('beforeeeeeee', this.props.book);
  }


  renderStyle(url) {
    return (
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${url})` }}></div>
    )
  }





  render() {
   
    return (
      <li key={this.props.book.id}>
        <div className="book">
          <div className="book-top">
            {this.renderStyle(this.props.book.imageLinks.smallThumbnail)}
            <div className="book-shelf-changer">
              <select id={this.props.book.id} onChange={this.change} value={this.state.value} defaultValue={this.props.book.shelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          {this.props.book.authors.map((author) => {
            return (
              <div key={author} className="book-authors">
                {author}<br></br>
              </div>
            )
          })}
        </div>
      </li>
    )
  }
}

export default ShowBook