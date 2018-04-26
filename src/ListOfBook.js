import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book'
class ListOfBook extends Component {
  static propTypes = {
    books: PropTypes.array,
    changeShelf: PropTypes.func
  }
  state = { changeShelf: false }
  render() {
    const { books, changeShelf } = this.props
    const typeOfShelfs = [{ type: 'currentlyReading', title: 'Currently Reading' },
                        { type: 'wantToRead',  title: 'Want to Read' },
                        { type: 'read', title: 'Read'},
                        {type: 'none', title: 'None'}]
    return (
      <div className="list-books-content">
        { typeOfShelfs.map((shelf, index) =>  { 
      const booksOfShelfs = books.filter( book => book.shelf === shelf.type)
          return  (
            <div className="shelf" key={index+shelf.title}>
              <h2 className="shelf-title">{ shelf.title }</h2>
              <div className="shelf-books">
                <ol className="books-grid">
        			{booksOfShelfs.map((book) => (<Book book={ book } books={ books } key={ book.id } changeShelf={ changeShelf }/>))}
      			</ol>
              </div>
            </div> )
        })}
      </div>
    )
  }
}
export default ListOfBook