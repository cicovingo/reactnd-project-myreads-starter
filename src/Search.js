import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }
  state = {
    searchErr: false,
    newBooks: [],
    query: ''
  }
  searchMethod = (event) => {
    const query = event.target.value
    this.setState({ query: query })
    if (query) {
      BooksAPI.search(query, 20).then((books) => {books.length > 0 ?  this.setState({newBooks: books, searchErr: false }) : this.setState({ newBooks: [], searchErr: true })})
  	} else this.setState({newBooks: [], searchErr: false })
  }
  render() {
    const { searchErr, newBooks, query } = this.state
    const { books, changeShelf } = this.props
      return (
        <div className="search-books">
          <div className="search-books-bar">
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author" value={ query } onChange={ this.searchMethod } />
            </div>
        	<Link className="close-search"  to="/">Close</Link>
          </div>
          <div className="search-results">
            { newBooks.length > 0 && (
              <div>
                <div className=''>
                  <h3>{ newBooks.length } books are found</h3>
                </div>
                <ol className="books-grid">
                  { newBooks.map((book) => (<Book book={ book } books={ books } key={ book.id } changeShelf={ changeShelf }/>))}
                </ol>
              </div>
            )}
            { searchErr  && (
              <div>
                <div className=''>
                  <h3>Books are not found.</h3>
                  </div>
                </div>
            )}
          </div>
        </div>
      )
	}
}
export default Search