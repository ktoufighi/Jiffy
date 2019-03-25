import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';


// going to add the Header component inside our App file since its too small

const Header = () => (
  <div className='header grid'>
    <h1 className='title'>Jiffy</h1>
  </div>
)

class App extends Component {
  // we can put our arrow functions directly into our component there
  // we won't need constructor and bind
  // so everythime we change something in input its going to give us an event
  handleChange = (event) => {
    // same as writing it this way only that we use curly brakets arund our variable
    // const value = event.target.value
    const {value} = event.target
    // when our search term is more than 2 letters we get a hint in the bottom and we would want to control that in our state.
    if (value.length > 2 && 'Enter') {
      console.log('We have a search term.');
    }
  };

  render() {
    return (
      <div className="page">
        <Header />
        <div className='search grid'>
          <input className='input grid-item' placeholder='Type something'
          onChange = {this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
