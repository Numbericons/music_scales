import React from 'react';
import './Music.css';
import { scalesNotes, scaleTriads, randomProgression } from './Archive/scaleGen.js';
const scaleGen = require('./scaleGen2.js');

class Music extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      root: '',
      tone: 'major',
      selectedOption: 'major'
    }
  }
  
  change = (event) => {
    const attr = event.target.name;
    let val = event.target.value;
    this.setState({ [attr]: val });
  }

  handleOptionChange = (event) => {
    const tone = event.target.value
    this.setState({
      selectedOption: event.target.value,
      tone: tone
    });
  }

  render(){
    const octave = "3";
    const notes = scaleGen.scalesNotes(this.state.root, this.state.tone).join(' ');
    const triads = scaleGen.scaleTriads(this.state.root, this.state.tone,octave,false).join(' ');
    const progression = scaleGen.randomProgression(this.state.root, this.state.tone, octave, 4);
    return (
      <div>
        <div className="noteSelect"> 
          <div className="rootInput">
            <h4>Enter a Root Note (add a # for sharp):</h4>
            <input type='text' name='root' onChange={this.change}/>
          </div>
          <div></div>
          <div className="majMinInput">
            {/* <h4>Major or minor (enter lowercase):</h4>
            <input type='text' name='tone' onChange={this.change}/> */}
          <form>
            <div className="radio">
              <label>
                <input type="radio" value="major" 
                              checked={this.state.selectedOption === 'major'} 
                              onChange={this.handleOptionChange} />
                Major
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="minor" 
                              checked={this.state.selectedOption === 'minor'} 
                              onChange={this.handleOptionChange} />
                Minor
              </label>
            </div>
          </form>

          </div>
        </div>
        <div className="output">
          <div>
            Root note: {this.state.root} Type: {this.state.tone}
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
