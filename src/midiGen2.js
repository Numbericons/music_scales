const scaleGen = require('./scaleGen2.js');
var MidiWriter = require('midi-writer-js');
const { Chord } = require("@tonaljs/tonal");
var track = new MidiWriter.Track();

const key = 'E';
const tonality = 'major';
const numChords = 150;
const octave = "4";
const duration = "1"
const sequential = false;
const prog = scaleGen.randomProgression(key, tonality, octave, numChords, false, true);
let array = [];
for (let i = 0; i < prog.length; i++) {
  array.push(new MidiWriter.NoteEvent({ pitch: prog[i], duration: duration }));
}

track.addEvent(array, function (event, index) {
  return { sequential: sequential };
}
);

// track.addEvent(
//   new MidiWriter.NoteEvent({
//     velocity: 1,
//     duration: '1', // 'T15', // 'T1584'
//     pitch: prog[0],
//     startTick: 0
//   })
// );
const type = sequential ? 'melody' : 'triads';
track.addTrackName(`${key} ${tonality} ${type}`);
var write = new MidiWriter.Writer(track);
write.saveMIDI(`${key}_${tonality}_${new Date}`);