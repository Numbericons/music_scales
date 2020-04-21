const notes = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
const majorPattern = 'WWHWWWH';
const minorPattern = 'WHWWHWW';
const majTriadPatt = [4,3];
const minTriadsPatt = [3,4];

const majorTriads = ['I','ii','iii','IV','V','vi', 'vii0'];
const minorTriads = ['i','ii0','III','iv','VI','VII'];


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
  const scale = scalesNotes( root, type);
  const triads = type === 'major' ? majorTriads : minorTriads; 
  
  return triads.map((triad,i) => {
    // const semitones = (triad === triad.toUpperCase()) ? majTriadPatt : minTriadsPatt;
    return triad + ': ' + scale[i] + " " + scale[(i + 2) % scale.length] + " " + scale[(i + 4) % scale.length];
  })
}

function randomProgression(root, type, numChords, inclSeven) {
  let triads = scaleTriads(root,type);
  console.log(triads);
  let prog = [];
  let progNum = [];

  for (let z=0;z<numChords;z++) {
    let tris = inclSeven ? triads.length : triads.length - 1;
    const rand = Math.floor(Math.random() * tris);
    progNum.push(rand + 1);
    prog.push(triads[rand]);
  }
  console.log(progNum);
  return prog;
}

// const scale = scalesNotes('D#','minor');
// console.log(scale);

// const triads = scaleTriads('E#','major');
// const triads = scaleTriads('E#','major',false);
// console.log(triads);

const progression = randomProgression('D','minor',4);
console.log(progression);



//TO DO:
//account for when a note can be called flat/sharp to make all notes appear in a scale

//how to create a midi file
//can a midi file be played on a website? Easily?

//make definitions file to avoid constants in main jsx
