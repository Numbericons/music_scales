import React from 'react';
import './App.css';
import { scalesNotes, scaleTriads, randomProgression } from './scaleGen.js';

class Music extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      root: '',
      majMin: ''
    }
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }
  
  change = (event) => {
    const attr = event.target.name;
    let val = event.target.value;
    this.setState({ [attr]: val });
  }

  submitNotes = (event) => {
    event.preventDefault();
    // alert("You are submitting as root " + this.state.root);
  }

  render(){
    // const root = 'D';
    const notes = scalesNotes(this.state.root, this.state.majMin).join(' ');
    const triads = scaleTriads(this.state.root, this.state.majMin).join(' ');
    const progression = randomProgression(this.state.root, this.state.majMin, 4);
    return (
      <div>
        <form className="noteSelect" onSubmit={this.submitNotes}>
          <div className="rootInput">
            <h4>Enter a Root Note (add a # for sharp):</h4>
            <input type='text' name='root' onChange={this.change}/>
          </div>
          <div></div>
          <div className="majMinInput">
            <h4>Major or minor (enter lowercase):</h4>
            <input type='text' name='majMin' onChange={this.change}/>
          </div>
          {/* <button>Calculate</button> */}
        </form>
        <div className="output">
          <div>
            Root note: {this.state.root} Type: {this.state.majMin}
          </div>
          <div>
            Notes in scale: {notes}
          </div>
          <ul>
            {triads}
          </ul>
          <ul>
            {progression.map(function (prog, idx) {
              return (<li key={idx}>{prog} </li>)
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Music;
