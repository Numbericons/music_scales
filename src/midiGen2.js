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
let velocity = 50
const randVelocity = true;
const sequential = true;
const randMelody = true;
let array = [];
let music;

if (randMelody) {
  music = scaleGen.randomMelody(key, tonality, octave, numChords, true)
} else {
  music = scaleGen.randomProgression(key, tonality, octave, numChords, false, true);
}

getDuration = () => {
  const durArr = ["2","4","8","16"];
  const idx = Math.floor(Math.random() * (durArr.length - 1))
  return durArr[idx];
}

getVelocity = () => {
  const rand = Math.random()   // 0 to 1     if .333 is negative    Mod - 25 - (0 to .3333)
  const mod = rand < .34 ? -rand : rand - .33;
  return mod * 35 + 50; 
}

for (let i = 0; i < music.length; i++) {
  if (randDuration) duration = getDuration();
  if (randVelocity) velocity = getVelocity();
  array.push(new MidiWriter.NoteEvent({ pitch: music[i], duration: duration, velocity: velocity }));
}

track.addEvent(array, function (event, index) {
  return { sequential: sequential };
}
);

const type = sequential ? 'melody' : 'triads';
track.addTrackName(`${key} ${tonality} ${type}`);
var write = new MidiWriter.Writer(track);
write.saveMIDI(`${key}_${tonality}_${new Date}`);