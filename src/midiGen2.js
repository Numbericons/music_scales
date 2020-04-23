const scaleGen = require('./scaleGen2.js');
var MidiWriter = require('midi-writer-js');
const { Chord } = require("@tonaljs/tonal");
var track = new MidiWriter.Track();

const key = 'E';
const tonality = 'major';
const numChords = 150;
const octave = "4";
let duration = "1"
const randDuration = true;
const sequential = true;
let array = [];

const prog = scaleGen.randomProgression(key, tonality, octave, numChords, false, true);

getDuration = () => {
  const durArr = ["1","2","4","8","16"];
  const idx = Math.floor(Math.random() * (durArr.length - 1))
  return durArr[idx];
}

for (let i = 0; i < prog.length; i++) {
  if (randDuration) duration = getDuration();
  array.push(new MidiWriter.NoteEvent({ pitch: prog[i], duration: duration }));
}

track.addEvent(array, function (event, index) {
  return { sequential: sequential };
}
);

const type = sequential ? 'melody' : 'triads';
track.addTrackName(`${key} ${tonality} ${type}`);
var write = new MidiWriter.Writer(track);
write.saveMIDI(`${key}_${tonality}_${new Date}`);