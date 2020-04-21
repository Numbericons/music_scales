import React from 'react';
import './App.css';

const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const majorPattern = 'WWHWWWH';
const minorPattern = 'WHWWHWW';
// const majTriadPatt = [4, 3];
// const minTriadsPatt = [3, 4];

const majorTriads = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii0'];
const minorTriads = ['i', 'ii0', 'III', 'iv', 'VI', 'VII'];


function scalesNotes(root, type) {
  let scale = [root];
  const pattern = type === 'major' ? majorPattern : minorPattern;

  for (let z = 0; z < pattern.length; z++) {
    const semitones = pattern[z] === 'W' ? 2 : 1;
    const lastIdx = notes.indexOf(scale[scale.length - 1]);
    scale.push(notes[(lastIdx + semitones) % notes.length]);
  }
  return scale;
}

function scaleTriads(root, type = 'major') { //major only
  const scale = scalesNotes(root, type);
  const triads = type === 'major' ? majorTriads : minorTriads;

  return triads.map((triad, i) => {
    // const semitones = (triad === triad.toUpperCase()) ? majTriadPatt : minTriadsPatt;
    return triad + ': ' + scale[i] + " " + scale[(i + 2) % scale.length] + " " + scale[(i + 4) % scale.length];
  })
}

function randomProgression(root, type, numChords, inclSeven) {
  let triads = scaleTriads(root, type);
  console.log(triads);
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

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      root: '',
      majMin: ''
    }
  }

  changeNote = (event) => {
    this.setState({ root: event.target.value });
  }

  submitNotes = (event) => {
    event.preventDefault();
    // alert("You are submitting as root " + this.state.root);
  }

  render(){
    // const root = 'D';
    debugger
    const type = 'major';
    const notes = scalesNotes(this.state.root, type).join(' ');
    const triads = scaleTriads(this.state.root, type).join(' ');
    const progression = randomProgression(this.state.root, type, 4);
    return (
      <div>
        <form className="noteSelect" onSubmit={this.submitNotes}>
          <div className="rootInput">
            <h4>Enter a Root Note (add a # for sharp):</h4>
            <input type='text' onChange={this.changeNote}/>
          </div>
          <div></div>
          <div className="majMinInput">
            <h4>Major or minor (enter lowercase):</h4>
            <input type='text'/>
          </div>
          <button>Click</button>
        </form>
        <div className="output">
          <div>
            {this.state.root} {type}
          </div>
          <div>
            {notes}
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

export default App;
