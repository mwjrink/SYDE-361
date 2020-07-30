interface input {
  bars: number;
  timeSignature: number[];
  key: string;
  generations: number;
  note_density: number;
  upbeatedness: number;
}

const notes = ["c", "^c", "d", "^d", "e", "f", "^f", "g", "^g,", "a", "^a", "b"];
const major_scale = [1, 3, 5, 6, 8, 10, 12];
const minor_scale = [1, 3, 4, 6, 8, 9, 11];
// FITNESS
// consonance vs disonance
// 1 8
// 1 6
// 1 10
// 1 5
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

function rotate_array<T>(arr: T[], count: number) {
  var len = arr.length >>> 0,
    count = count >> 0;

  arr.splice(count % len, len);
  return arr;
}

export default function GenerateMusic({ bars, timeSignature, key, generations, note_density, upbeatedness }: input) {
  const notes_per_bar = timeSignature[1] * 2;

  // generate the initial value
  let bestFit: number[][] = [];
  let bestFit_length: number[] = [];

  const amount = notes.findIndex((value) => value.startsWith(key.substr(0, 1).toLowerCase()));
  const notes_recentered = notes.slice(amount).concat(notes.slice(0, amount));
  const notes_in_key = key.endsWith("m") ? minor_scale.map((i) => notes_recentered[i - 1]) : major_scale.map((i) => notes_recentered[i - 1]);

  // change this to generate from the seed
  for (let i = 0; i < bars * notes_per_bar; i++) {
    bestFit.push([getRandomInt(notes_in_key.length)]);
  }

  for (let i = 0; i < bars; i++) {
    let total = notes_per_bar;
    while (total > 0) {
      const rand = getRandomInt(note_density);
      if (rand <= total) {
        bestFit_length.push(rand);
        total -= rand;
      }
    }
  }

  for (let j = 0; j < generations; j++) {
    let mutated: number[][][] = [];
    let note_lengths: number[][] = [];

    // mutation types
    // 1. note moved up or down by 1
    //// 3. change timing on note to be longer or short and add a rest or remove another consecutive note
    // 4. create a chord with a note one octave down making the other two notes wholes
    // 5. sequences of notes // not sure what I meant by this

    for (let k = 0; k < bestFit.length; k++) {
      let current_index = mutated.length;
      mutated.push(bestFit.slice(0));
      mutated[current_index][k] = mutated[current_index][k].length === 1 ? [mutated[current_index][k][0] === 6 ? 0 : mutated[current_index][k][0] + 1] : mutated[current_index][k]; // up a note in the key

      current_index = mutated.length;
      mutated.push(bestFit.slice(0));
      mutated[current_index][k] = mutated[current_index][k].length === 1 ? [mutated[current_index][k][0] === 0 ? 6 : mutated[current_index][k][0] - 1] : mutated[current_index][k]; // down a note in the key
    }

    for (let k = 0; k < bestFit.length; k++) {
      if (bestFit[k].length === 1) {
        for (let j = 0; j < notes_in_key.length; j++) {
          let current_index = mutated.length;
          mutated.push(bestFit.slice(0));
          mutated[current_index][k] = [mutated[current_index][k][0], j];
        }

        for (let j = 0; j < notes_in_key.length ** 2; j++) {
          let current_index = mutated.length;
          mutated.push(bestFit.slice(0));
          mutated[current_index][k] = [mutated[current_index][k][0], j % 7, Math.trunc(j / 7)];
        }
      }
    }

    for (let k = 0; k < bestFit.length; k++) {
      note_lengths[k] = [];
      for (let i = 0; i < bars; i++) {
        let total = notes_per_bar;
        while (total > 0) {
          if ((note_lengths[k].length === bestFit.length)) {
            note_lengths[k].push(total);
            break;
          }

          const rand = getRandomInt(note_density);
          if (rand <= total) {
            note_lengths[k].push(rand);
            total -= rand;
          }
        }
      }
      while (note_lengths[k].length < bestFit.length) {
        const rand = getRandomInt(note_lengths[k].length);
        note_lengths[k].splice(rand, 0, 0);
      }
    }

    // for (let k = 0; k < bestFit.length - 1; k++) {
    //     let current_index = mutated.length;
    //     mutated.push(bestFit.slice(0));
    //     note_lengths[current_index][k] = note_lengths[current_index][k];
    // }
    bestFit = evaluate(mutated, notes_per_bar, upbeatedness);
    bestFit_length = evaluate_note_lengths(note_lengths, notes_per_bar, note_density);

    // evaluate best option
    //bestFit = evaluate(mutated, key);
  }

  let result: string[] = [];

  for (let i = 0; i < bestFit.length; i += notes_per_bar) {
    if (note_density === -1) {
      result = result.concat(bestFit.slice(i, i + notes_per_bar).map((nts, index) => "[" + nts.map((j) => notes_in_key[j] + bestFit_length[i + index]).join("") + "]"));
    } else {
      result = result.concat(
        bestFit
          .slice(i, i + notes_per_bar)
          .filter((value, index) => bestFit_length[index + i] != 0)
          .map((nts, index) => "[" + nts.map((j) => notes_in_key[j] + bestFit_length[i + index]).join("") + "]")
      );
    }
    if (i != bestFit.length - notes_per_bar) {
      result.push("|");
    } else {
      result.push(":|");
    }
  }

  // console.log(bestFit_length);

  return result;
}

// FITNESS
// consonance vs disonance
// 1 8
// 1 6
// 1 10
// 1 5
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
function evaluate(mutations: number[][][], notes_per_bar: number, upbeatedness: number) {
  const evaluations: { value: number; index: number }[] = [];
  for (let i = 0; i < mutations.length; i++) {
    let score = 0;

    let upbeat_score = 0;
    let number_of_chords = 0;
    let last_chord_index = -notes_per_bar;
    for (let j = 0; j < mutations[i].length; j++) {
      if (j > 0) {
        if (mutations[i][j][0] > mutations[i][j - 1][0]) {
          upbeat_score++;
        } else if (mutations[i][j][0] < mutations[i][j - 1][0]) {
          upbeat_score--;
        }
      }

      if (mutations[i][j].length > 1) {
        number_of_chords++;
        const dist_last_chord = j - last_chord_index;
        score -= Math.abs(dist_last_chord - notes_per_bar);
        last_chord_index = j;
      }
    }
    score -= Math.abs(number_of_chords - mutations[0].length / notes_per_bar);
    score += upbeat_score * upbeatedness;

    for (let j = 0; j < mutations[i].length; j++) {
      const current_chord = mutations[i][j];

      const sorted = current_chord.slice(0).sort();
      const dist1 = sorted[1] - sorted[0];
      if (sorted.length > 2) {
        const dist2 = sorted[2] - sorted[1];

        if (dist1 === 1) {
          score -= 5;
        } else {
          score += -Math.abs(dist1 - 2) + 1;
        }

        if (dist2 === 1) {
          score -= 5;
        } else {
          score += -Math.abs(dist2 - 2) + 1;
        }
      } else if (sorted.length === 2) {
        if (dist1 === 1) {
          score -= 5;
        } else {
          score += -Math.abs(dist1 - 2) + 1;
        }
      }
    }
    evaluations.push({ value: score, index: i });
  }

  const sorted = evaluations.sort((a, b) => b.value - a.value);
  return mutations[sorted[0].index]
    .slice(0, mutations[sorted[0].index].length / 2 - 1) //
    .concat(mutations[sorted[1].index].slice(mutations[sorted[1].index].length / 2 - 1, mutations[sorted[1].index].length));
}

function evaluate_note_lengths(note_lengths: number[][], notes_per_bar: number, note_density: number) {
  const evaluations: { value: number; index: number }[] = [];

  for (let i = 0; i < note_lengths.length; i++) {
    const value = Math.abs(note_lengths[i].filter((i) => i > 0).length - note_density * notes_per_bar);
    evaluations.push({ value, index: i });
  }

  const sorted = evaluations.sort((a, b) => a.value - b.value);

  return note_lengths[sorted[0].index]
    .slice(0, note_lengths[sorted[0].index].length / 2 - 1) //
    .concat(note_lengths[sorted[1].index].slice(note_lengths[sorted[1].index].length / 2 - 1, note_lengths[sorted[1].index].length));
}

function shuffle(a: any[]) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
