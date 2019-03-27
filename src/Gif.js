import React, { Component } from 'react';

// here we are going to create our video Component
// we create it as a class b/c later on we can add some state to it
class Gif extends Component {
  //when video is fully loaded we add the loaded className otherwise it will stay hidden. to do this we are going to set up some state inside our video component
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  render() {
    const {loaded} = this.state;
    const {images} = this.props;
    // adding a if statment saying when video loaded use className loaded otherwise don't show anything.
      return <video className={`grid-item video ${loaded ? 'loaded' : ''}`} autoPlay loop src = {images.original.mp4} onLoadedData={() => this.setState ({loaded: true})}
    />
  }
}
export default Gif;
