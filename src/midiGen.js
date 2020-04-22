// import randomProgression from './scaleGen.js';
// const scaleGen = require('./scaleGen.js')
var MidiWriter = require('midi-writer-js');
var track = new MidiWriter.Track();

const constants = {
  notes: ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
  majorPattern: 'WWHWWWH',
  minorPattern: 'WHWWHWW',
  majTriadPatt: [4, 3],
  minTriadsPatt: [3, 4],
  majorTriads: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii0'],
  minorTriads: ['i', 'ii0', 'III', 'iv', 'VI', 'VII']
};

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

function scaleTriads(root, type='major', midi=false) {
  const scale = scalesNotes(root, type);
  const triads = type === 'major' ? constants.majorTriads : constants.minorTriads;

  return triads.map((triad, i) => {
    if (midi) return [scale[i]+"4", scale[(i + 2) % scale.length]+"4", scale[(i + 4) % scale.length]+"4"];
    return triad + ': ' + scale[i] + " " + scale[(i + 2) % scale.length] + " " + scale[(i + 4) % scale.length];
  })
}

function randomProgression(root, type, numChords, inclSeven, midi = false) {
  let triads = scaleTriads(root, type, midi);
  let prog = [];
  let progNum = [];

  for (let z = 0; z < numChords; z++) {
    let tris = inclSeven ? triads.length : triads.length - 1;
    const rand = Math.floor(Math.random() * tris);
    progNum.push(rand + 1);
    prog.push(triads[rand]);
  }
  return prog;
}

let key = 'E';
let type ='major';
let numChords = 8;
const prog = randomProgression(key,type,numChords,false,true);
let array = [];
for (let i=0; i<prog.length; i++) {
  array.push(new MidiWriter.NoteEvent({ pitch: prog[i], duration: '8' }));
}

track.addEvent(array, function (event, index) {
// track.addEvent([
//   new MidiWriter.NoteEvent({ pitch: ['E4', 'D4'], duration: '4' }),
//   // new MidiWriter.NoteEvent({ pitch: ['E4', 'D4'], duration: '4' }),
//   // new MidiWriter.NoteEvent({ pitch: ['C4'], duration: '2' }),
//   // new MidiWriter.NoteEvent({ pitch: ['E4', 'D4'], duration: '4' }),
//   // new MidiWriter.NoteEvent({ pitch: ['C4'], duration: '2' }),
//   // new MidiWriter.NoteEvent({ pitch: ['C4', 'C4', 'C4', 'C4', 'D4', 'D4', 'D4', 'D4'], duration: '8' }),
//   // new MidiWriter.NoteEvent({ pitch: ['E4', 'D4'], duration: '4' }),
//   // new MidiWriter.NoteEvent({ pitch: ['C4'], duration: '2' })
// ], function (event, index) {
  return { sequential: true };
}
);

var write = new MidiWriter.Writer(track);
console.log(write.saveMIDI(`${key}_${type}_${new Date}`));
// console.log(write.dataUri());


// const MidiWriter = require('midi-writer-js');

// // Start with a new track
// const track = new MidiWriter.Track();

// // Define an instrument (optional):
// // track.addEvent(new MidiWriter.ProgramChangeEvent({ instrument: 1 }));

// // Add some notes:
// const note = new MidiWriter.NoteEvent({ pitch: ['C4', 'D4', 'E4'], duration: '4' });
// track.addEvent(note);

// // Generate a data URI
// const write = new MidiWriter.Writer(track);
// console.log(write.dataUri());