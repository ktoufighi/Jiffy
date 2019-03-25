import React, { Component } from 'react';
import './App.css';
import loader from './images/loader.svg';


// going to add the Header component inside our App file since its too small

const Header = () => (
  <div className='header grid'>
    <h1 className='title'>Jiffy</h1>
  </div>
)

const UserHint = ({loading, hintText}) => (
  <div className='user-hint'>
    {loading ? <img className='block mx-auto' src={loader} /> : hintText}
  </div>
)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      gifs: [],
      hintText: '',
      loading: false
    }
  }

  handleChange = event => {
    // const value = event.target.value
    const {value} = event.target
    // we need to manually set the state each time we have a new search term
    this.setState((prevState, props) => ({
    // we spread all the prevState (props)
      ...prevState,
      // and overwrite them with the value we put in same applies for hint text
      searchTerm: value,
      hintText: value.length > 2 ? `Hit enter to search ${value}.` : ''
    }));
  };

  // the way to access what key we pressed to get the seach started we can access something called key.
  handleKeyPress = event => {
      const {value} = event.target
      if (value.length > 2 && event.key === 'Enter') {
      alert(`Search for ${value}`)
    }
  };

  render() {
    // const searchTerm = this.state.searchTerm
    const { searchTerm } = this.state
    return (
      <div className="page">
        <Header />
        <div className='search grid'>
          <input className='input grid-item' placeholder='Type something'
          onChange = {this.handleChange}
          onKeyPress = {this.handleKeyPress}
          // this is a controlled input everytime we put a value we overwrite the old ones
          value = {searchTerm}
          />
        </div>
        <UserHint {...this.state}/>
      </div>
    );
  }
}

export default App;
