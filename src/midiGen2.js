// const musicConst = require('./constants2.js');
const scaleGen = require('./scaleGen2.js');
var MidiWriter = require('midi-writer-js');
// const { Chord } = require("@tonaljs/tonal");
var track = new MidiWriter.Track();

const key = 'F';
const type = 'major';
const numChords = 8;
const octave = "3";
const prog = scaleGen.randomProgression(key, type, octave, numChords, false, true);
let array = [];
for (let i = 0; i < prog.length; i++) {
  array.push(new MidiWriter.NoteEvent({ pitch: prog[i], duration: '1' }));
}
// array.push(new MidiWriter.NoteEvent({ pitch: prog[0].join(''), duration: '1' }));

track.addEvent(array, function (event, index) {
  return { sequential: true };
}
);

var write = new MidiWriter.Writer(track);
console.log(write.saveMIDI(`${key}_${type}_${new Date}`));