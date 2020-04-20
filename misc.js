const notes = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
const majorPattern = 'WWHWWWH';
const minorPattern = 'WHWWHWW';
const majTriads = [4,3];
const minTriads = [3,4];

const majorTriads = ['I','ii','iii','IV','V','vi'];


function scalesNotes(root, type) {
  let scale = [root];
  const pattern = type === 'major' ? majorPattern : minorPattern;
  
  for (let z=0;z < pattern.length; z++) {
    const semitones = pattern[z] === 'W' ? 2 : 1;
    const lastIdx = notes.indexOf(scale[scale.length - 1]);
    scale.push(notes[(lastIdx + semitones) % notes.length]);
  }
  return scale;
}

function scaleTriads(root,type = 'major') { //major only
  const scale = (scalesNotes, type);

  return scale.map(note => {
    const semitones = (note === note.toUpperCase()) ? majTriads : minTriads;
  })
}

const scale = scalesNotes('D#','minor');
console.log(scale);

//TO DO:
//account for when a note can be called flat/sharp to make all notes appear in a scale