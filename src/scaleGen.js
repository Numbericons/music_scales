import Constants from './constants.js';
// const constants = require('./constants.js')

const constants = Constants;

export function scalesNotes(root, type) {
  let scale = [root];
  const pattern = type === 'major' ? constants.majorPattern : constants.minorPattern;

  for (let z = 0; z < pattern.length; z++) {
    const semitones = pattern[z] === 'W' ? 2 : 1;
    const lastIdx = constants.notes.indexOf(scale[scale.length - 1]);
    scale.push(constants.notes[(lastIdx + semitones) % constants.notes.length]);
  }
  return scale;
}

export function scaleTriads(root, type = 'major') {
  const scale = scalesNotes(root, type);
  const triads = type === 'major' ? constants.majorTriads : constants.minorTriads;

  return triads.map((triad, i) => {
    return triad + ': ' + scale[i] + " " + scale[(i + 2) % scale.length] + " " + scale[(i + 4) % scale.length];
  })
}

export function randomProgression(root, type, numChords, inclSeven, midi = false) {
  let triads = scaleTriads(root, type);
  let prog = [];
  let progNum = [];

  for (let z = 0; z < numChords; z++) {
    let tris = inclSeven ? triads.length : triads.length - 1;
    const rand = Math.floor(Math.random() * tris);
    progNum.push(rand + 1);
    prog.push(triads[rand]);
  }
  console.log(progNum);
  return prog;
}