import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListOfBook from './ListOfBook'
import { Link } from 'react-router-dom'
import Search from './Search'
import PropTypes from 'prop-types'
class BooksApp extends React.Component {
  static propTypes = {
    books: PropTypes.array,
    changeShelf: PropTypes.func
  }
  state = { books: [] }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }
  
  changeShelf = ( newBook, newShelf ) => 
	{BooksAPI.update(newBook, newShelf).then(response =>{newBook.shelf = newShelf 
     var updatedBooks = this.state.books.filter( book => book.id !== newBook.id ) 
     updatedBooks.push(newBook); this.setState({ books: updatedBooks })})}
  render() {
    const { books } = this.state
    return (
      <div className="app">
        <Route path="/search" render={( { history }) => (<Search books={ books } changeShelf={ this.changeShelf }/>)}/>
        <Route exact  path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ListOfBook books={ books } changeShelf={ this.changeShelf }/>
            <div className="open-search">
      			<Link to="/search">Search</Link>
            </div>
         </div>
        )} />
		<Route path="*" render={()=>(<div>NoMatch</div>)} />
      </div>
    )
  }
}
export default BooksApp