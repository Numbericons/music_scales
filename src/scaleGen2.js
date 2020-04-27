const Constants = require('./constants2.js')

const constants = Constants.constants;

function scalesNotes(root, tonality) {
  let scale = [root];
  const pattern = tonality === 'major' ? constants.majorPattern : constants.minorPattern;

  for (let z = 0; z < pattern.length; z++) {
    const semitones = pattern[z] === 'W' ? 2 : 1;
    const lastIdx = constants.notes.indexOf(scale[scale.length - 1]);
    scale.push(constants.notes[(lastIdx + semitones) % constants.notes.length]);
  }
  return scale;
}

function scaleTriads(root, tonality = 'major', octave="3",midi=false) {
  let scale = scalesNotes(root, tonality);
  const triads = tonality === 'major' ? constants.majorTriads : constants.minorTriads;
  if (midi) {
    scale = scale.map(note => {
      if (note === 'C#' || (note === 'C' && !scale.includes('C#'))) {
        // currOctave = octave;
        octave = (parseInt(octave) + 1).toString();
        // return note + currOctave
      }
      return note + octave;
    })
  }

  return triads.map((triad, i) => {
    if (midi) return [scale[i], scale[(i + 2) % scale.length], scale[(i + 4) % scale.length]];
    return triad + ': ' + scale[i] + " " + scale[(i + 2) % scale.length] + " " + scale[(i + 4) % scale.length];
  })
}

function randomChordGen(triads, prog, tris) {
  const rand = Math.floor(Math.random() * tris);
  if (prog[prog.length - 1] === triads[rand]) {
    return randomChordGen(triads, prog, tris);
  } else if (prog.length < triads.length * 2 && prog.includes(triads[rand]) && Math.random() > .1) {
    return randomChordGen(triads, prog, tris);
  } else {
    return rand;
  }
}

function randomProgression(root, tonality, octave, numChords, inclSeven, midi = false) {
  let triads = scaleTriads(root, tonality, octave, midi);
  let music = [];
  let progNum = [];

  for (let z = 0; z < numChords; z++) {
    let tris = inclSeven ? triads.length : triads.length - 1;
    const chordIdx = randomChordGen(triads, music, tris);
    progNum.push(chordIdx + 1);
    music.push(triads[chordIdx]);
  }
  return music;
}

function randomMelody(root, tonality, octave, numChords, inclSeven) {
  let scale = scalesNotes(root, tonality);
  let music = [];

  scale = scale.map(note => {
    if (note === 'C#' || (note === 'C' && !scale.includes('C#'))) {
      octave = (parseInt(octave) + 1).toString();
    }
    return note + octave;
  })

  for (let m=0; m < numChords; m++) {
    let rand = Math.floor(Math.random() * (scale.length - 1));
    music.push(scale[rand]);
  }

  return music;
}

// const scale = scalesNotes('D#','minor');
// console.log(scale);

// const triads = scaleTriads('E#','major');
// const triads = scaleTriads('E#','major',false);
// console.log(triads);

// const progression = randomProgression('D', 'minor', 4);
// console.log(progression);

module.exports = {
  scalesNotes,
  scaleTriads,
  randomProgression,
  randomMelody
}