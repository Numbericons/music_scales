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

var MidiWriter = require('midi-writer-js');

var track = new MidiWriter.Track();

track.addEvent([
  new MidiWriter.NoteEvent({ pitch: ['E4', 'D4'], duration: '4' }),
  new MidiWriter.NoteEvent({ pitch: ['C4'], duration: '2' }),
  new MidiWriter.NoteEvent({ pitch: ['E4', 'D4'], duration: '4' }),
  new MidiWriter.NoteEvent({ pitch: ['C4'], duration: '2' }),
  new MidiWriter.NoteEvent({ pitch: ['C4', 'C4', 'C4', 'C4', 'D4', 'D4', 'D4', 'D4'], duration: '8' }),
  new MidiWriter.NoteEvent({ pitch: ['E4', 'D4'], duration: '4' }),
  new MidiWriter.NoteEvent({ pitch: ['C4'], duration: '2' })
], function (event, index) {
  return { sequential: true };
}
);

var write = new MidiWriter.Writer(track);
console.log(write.saveMIDI('test'));
// console.log(write.dataUri());