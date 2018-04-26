import React, { Component } from 'react';
import PropTypes from 'prop-types'
class Book extends Component {
  static propTypes = {
    book: PropTypes.object,
    books: PropTypes.array,
    changeShelf: PropTypes.func
  }
  render() {
    var current = 'none'
    const { book, books, changeShelf } = this.props
    const title = book.title ? book.title : "No title available"
        for (let shelf of books ) {
          if (shelf.id === book.id)  {
            current = shelf.shelf
            break
          }
        }
    return (
          <li>
            <div className="book">
              <div className="book-top">
                <div className="book-cover"  style={{ backgroundImage:`url(${book.imageLinks.thumbnail})`,width:128,height:193}}>
				</div>
              	<div className="book-shelf-changer">
                  <select  onChange={(event) => changeShelf(book, event.target.value)}
                    defaultValue={ current }>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
           	  </div>
              <div className="book-title">{ title }</div>
              {book.authors && book.authors.map((author, index) => ( <div className="book-authors" key={index}>{author}</div>))}
            </div>
          </li>
    	)
  	}
}
export default Book