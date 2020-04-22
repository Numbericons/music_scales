const Constants = require('./constants2.js')

const constants = Constants.constants;

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

function scaleTriads(root, type = 'major', octave,midi=false) {
  const scale = scalesNotes(root, type);
  const triads = type === 'major' ? constants.majorTriads : constants.minorTriads;

  return triads.map((triad, i) => {
    if (midi) return [scale[i] + octave, scale[(i + 2) % scale.length] + octave, scale[(i + 4) % scale.length] + octave];
    return triad + ': ' + scale[i] + " " + scale[(i + 2) % scale.length] + " " + scale[(i + 4) % scale.length];
  })
}

function randomProgression(root, type, octave, numChords, inclSeven, midi = false) {
  let triads = scaleTriads(root, type, octave, midi);
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

module.exports = {
  scalesNotes,
  scaleTriads,
  randomProgression
}