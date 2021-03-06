import React from 'react';
import './Music.css';
// import { scalesNotes, scaleTriads, randomProgression } from './Archive/scaleGen.js';
const scaleGen = require('./scaleGen2.js');

class Music extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      root: 'C',
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
          <div className="noteSelect-notes">
            {/* <h4>Enter a Root Note (add a # for sharp):</h4>
            <input type='text' name='root' onChange={this.change}/> */}
            <form className="rootInput">
              <div className="radio">
                <label className='radioInLine'>
                  <input type="radio" value="A"
                    checked={this.state.root === 'A'}
                    name='root' onChange={this.change} />
                  A
                </label>
              </div>
              <div className="radio">
                <label className='radioInLine'>
                  <input type="radio" value="A#"
                    checked={this.state.root === 'A#'}
                    name='root' onChange={this.change} />
                  A#
                </label>
              </div>
              <div className="radio">
                <label className='radioInLine'>
                  <input type="radio" value="B"
                    checked={this.state.root === 'B'}
                    name='root' onChange={this.change} />
                  B
                </label>
              </div>
              <div className="radio">
                <label className='radioInLine'>
                  <input type="radio" value="C"
                    checked={this.state.root === 'C'}
                    name='root' onChange={this.change} />
                  C
                </label>
              </div>
              <div className="radio">
                <label className='radioInLine'>
                  <input type="radio" value="C#"
                    checked={this.state.root === 'C#'}
                    name='root' onChange={this.change} />
                  C#
                </label>
              </div>
              <div className="radio">
                <label className='radioInLine'>
                  <input type="radio" value="D"
                    checked={this.state.root === 'D'}
                    name='root' onChange={this.change} />
                  D
                </label>
              </div>
              <div className="radio">
                <label className='radioInLine'>
                  <input type="radio" value="D#"
                    checked={this.state.root === 'D#'}
                    name='root' onChange={this.change} />
                  D#
                </label>
              </div>
              <div className="radio">
                <label className='radioInLine'>
                  <input type="radio" value="E"
                    checked={this.state.root === 'E'}
                    name='root' onChange={this.change} />
                  E
                </label>
              </div>
              <div className="radio">
                <label className='radioInLine'>
                  <input type="radio" value="F"
                    checked={this.state.root === 'F'}
                    name='root' onChange={this.change} />
                  F
                </label>
              </div>
              <div className="radio">
                <label className='radioInLine'>
                  <input type="radio" value="F#"
                    checked={this.state.root === 'F#'}
                    name='root' onChange={this.change} />
                  F#
                </label>
              </div>
              <div className="radio">
                <label className='radioInLine'>
                  <input type="radio" value="G"
                    checked={this.state.root === 'G'}
                    name='root' onChange={this.change} />
                  G
                </label>
              </div>
              <div className="radio">
                <label className='radioInLine'>
                  <input type="radio" value="G#"
                    checked={this.state.root === 'G#'}
                    name='root' onChange={this.change} />
                  G#
                </label>
              </div>
            </form>
          </div>
          <div></div>
          <div className="toneInput">
            <form>
              <div className="radio">
                <label className="radio-label">
                  <input type="radio" value="major" 
                                checked={this.state.selectedOption === 'major'} 
                                onChange={this.handleOptionChange} />
                  Major
                </label>
              </div>
              <div className="radio">
                <label className="radio-label">
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
          <div className="rootTone">
            <h5 className="rootTone-text">Root note:</h5>
            <div className="rootTone-info">
              {this.state.root} ({this.state.tone})
            </div>
          </div>
          <div className="scaleNotes">
            <h5 className="scaleNotes-text">Notes in scale:</h5>
            <div className="scaleNotes-info">
              {notes}
            </div>
          </div>
          <ul className="triads">
            <h5 className="triads-text">Triads from scale: </h5>
            <div className="triads-info">
              {triads}
            </div>
          </ul>
          <ul className='progressions'>
            <h4 className='progressions-title'>Random Progression:</h4>
            {progression.map(function (prog, idx) {
              return (<li className='progressions' key={idx}> {prog} </li>)
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Music;
