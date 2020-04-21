import React from 'react';
import './App.css';
import Constants from './constants.js';

const constants = Constants;

function scalesNotes(root, type) {
  let scale = [root];
  const pattern = type === 'major' ? constants.majorPattern : constants.minorPattern;

  for (let z = 0; z < pattern.length; z++) {
    const semitones = pattern[z] === 'W' ? 2 : 1;
    const lastIdx = constants.notes.indexOf(scale[scale.length - 1]);
    scale.push(constants.notes[(lastIdx + semitones) % constants.notes.length]);
  }
  return scale;
}

function scaleTriads(root, type = 'major') {
  const scale = scalesNotes(root, type);
  const triads = type === 'major' ? constants.majorTriads : constants.minorTriads;

  return triads.map((triad, i) => {
    return triad + ': ' + scale[i] + " " + scale[(i + 2) % scale.length] + " " + scale[(i + 4) % scale.length];
  })
}

function randomProgression(root, type, numChords, inclSeven) {
  let triads = scaleTriads(root, type);
  // console.log(triads);
  let prog = [];
  let progNum = [];

  for (let z = 0; z < numChords; z++) {
    let tris = inclSeven ? triads.length : triads.length - 1;
    const rand = Math.floor(Math.random() * tris);
    progNum.push(rand + 1);
    prog.push(triads[rand]);
  }
  console.log(progNum);
  return prog;
}

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
