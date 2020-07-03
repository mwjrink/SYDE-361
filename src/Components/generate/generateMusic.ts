interface input {
  bars: number;
  timeSignature: number[];
  key: string;
  mutations: number;
  generations: number;
}

// mutation types
// 1. note moved up or down by 1
// 3. change timing on note to be longer or short and add a rest or remove another consecutive note
// 4. create a chord with a note one octave down making the other two notes wholes
// 5. sequences of notes

// fitness
// 1.
// 2.

const notes = [
  "c,",
  "d,",
  "e,",
  "f,",
  "g,",
  "A",
  "B",
  "c",
  "d",
  "e",
  "f",
  "g",
  "a",
  "b",
  "c'",
  "d'",
];
const major_scale = [1, 3, 5, 6, 8, 10, 12];
const minor_scale = [1, 3, 4, 6, 8, 9, 11];
// consonance vs disonance
// 1 8
// 1 6
// 1 5
// 1 10
// 1 3
// 1 12
// threes (chords)
// 1 5 8 // skip 1
// 3 6 10
// 5 8 12
// even intervals
// 1 is best to skip
// negative score for repeated single notes
// any less than 2 repeated sequences is bad any more than 5 is bad
// pattern in note timings that isnt just the same, also near eachother
const rest = "REST";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default function GenerateMusic({
  bars,
  timeSignature,
  key,
  mutations,
  generations,
}: input) {
  const notes_per_bar = timeSignature[1] * 2;

  // generate the initial value
  let bestFit: string[] = [];
  let notes_in_key = [];

  for (let i = 0; i < bars * notes_per_bar; i++) {
    bestFit.push(notes[getRandomInt(notes.length)]);
  }

  //   for (let j = 0; j < generations; j++) {
  //     let mutated: string[][] = [];

  //     //for (let i = 0; i < mutations; i++)
  //     {
  //       for (let k = 0; k < bestFit.length; k++) {
  //         let current_index = mutated.length;
  //         mutated.push(bestFit);
  //         mutated[current_index][k] = mutated[current_index][k]; //up a note in the key

  //         current_index = mutated.length;
  //         mutated.push(bestFit);
  //         mutated[current_index][k] = mutated[current_index][k]; // down a note in the key
  //       }

  //       // iterate on bestFit
  //     }
  //     // evaluate best option
  //     //bestFit = evaluate(mutated, key);
  //   }

  return bestFit;
}

function evaluate(mutations: string[][], key: string) {
  if (key.endsWith("m")) {
    // minor
  } else {
    // major
  }
  const evaluations: { value: number; index: number }[] = [];
  for (let i = 0; i < mutations.length; i++) {
    let note1 = undefined;
    let note2 = undefined;
    let score = 0;
    for (let j = 0; j < mutations[i].length; j++) {
      if (note1 === undefined) {
        //
      }

      if (note2 === undefined) {
        //
      }

      const current_note = mutations[i][j];
    }
    evaluations.push({ value: score, index: i });
  }

  return mutations[evaluations.sort((a, b) => b.value - a.value)[0].index];
}
