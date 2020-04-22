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
    scale = scale.map((note,i) => {
      if (note === 'C#' || note === 'C' && !scale.includes('C#')) {
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
  let prog = [];
  let progNum = [];

  for (let z = 0; z < numChords; z++) {
    let tris = inclSeven ? triads.length : triads.length - 1;
    const rand = Math.floor(Math.random() * tris);
    const chordIdx = randomChordGen(triads, prog, tris);
    progNum.push(chordIdx + 1);
    prog.push(triads[chordIdx]);
  }
  return prog;
}

module.exports = {
  scalesNotes,
  scaleTriads,
  randomProgression
}
