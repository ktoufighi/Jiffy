import React, { Component } from 'react';
import './App.css';
import loader from './images/loader.svg';
import Gif from './Gif';
import ClearButton from './images/close-icon.svg';


const randomChoice = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

// going to add the Header component inside our App file since its too small

const Header = ({clearSearch, hasResults}) => (
  <div className='header grid'>
  {hasResults ? <button onClick={clearSearch}><img src={ClearButton}/>  </button> : <h1 className='title'>Jiffy</h1>}
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

  // here we would send our request to giphy using fetch and placing our search term as a varialbe inside the query request to giphy api.

  // we need a function called searchGiphy to use async/await function
  searchGiphy = async (searchTerm) => {
    this.setState({
      // we set the state to show loading spinner while we wait for response to come back
      loading: true
    })

    try {
      const response = await fetch (
        `https://api.giphy.com/v1/gifs/search?api_key=ucdWBMSLRaxoFuirhQdgvR2zVgm1c4zj&q=${searchTerm}&limit=25&offset=0&rating=G&lang=en`
    );
      const {data} = await response.json();

      // if the data returned was empty [] we need to stop code to do so we need to throw an error in the catch area
      if (!data.length) {
        // we gonna throw an error code then stop and goes to catch part
        throw `Nothing found for ${searchTerm}`
      }


      // here we grab our random result from the randomChoice function
      const randomGif = randomChoice(data);
      console.log(randomGif);
      console.log(data);

      this.setState((prevState, props) => ({
        ...prevState,
        // in our array of gifs we are going to spread our prev gifs and then add random gif to that.
        gifs: [...prevState.gifs, randomGif],
        // we turn off loading spinner when the video is displayed
        loading: false,
        hintText: `Press enter to see more ${searchTerm}`
      }));
    }
    catch (error) {
      this.setState((prevState, props) => ({
        ...prevState,
        loading: false,
        hintText: error
      }))
      console.log(error)
    }
  };

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
      // here we call our searchGiphy with the search term that comes from value
      this.searchGiphy(value)
    }
  };

  // inside our main component we're going to write a function that allows us to clear search
  clearSearch = () => {
    this.setState((prevState, props) => ({
      ...prevState,
      hintText: '',
      gifs: [],
      searchTerm: ''
    }))
    this.textInput.focus();
  }


  render() {
    // const searchTerm = this.state.searchTerm
    // gif as a variable equals to this.state
    const { searchTerm, gifs } = this.state;
    // we set a variable to see if we have any gifs
    const hasResults = gifs.length;
    return (
      <div className="page">
        <Header clearSearch={this.clearSearch} hasResults={hasResults} />
        <div className='search grid'>
          {this.state.gifs.map(gif => {
            {/* we spread out all the gif properties into our Gif component after we run a map function on the array */}
            return <Gif {...gif}/>
          })}

          <input
          className='input grid-item'
          placeholder='Type something'
          onChange = {this.handleChange}
          onKeyPress = {this.handleKeyPress}
          // this is a controlled input everytime we put a value we overwrite the old ones
          value = {searchTerm}
          ref={input =>
            { this.textInput = input;
            }}
          />
        </div>
        <UserHint {...this.state}/>
      </div>
    );
  }
}

export default App;
