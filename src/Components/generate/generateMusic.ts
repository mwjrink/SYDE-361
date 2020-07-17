interface input {
    bars: number
    timeSignature: number[]
    key: string
    generations: number
}

const notes = ['c', '^c', 'd', '^d', 'e', 'f', '^f', 'g', '^g,', 'a', '^a', 'b']
const major_scale = [1, 3, 5, 6, 8, 10, 12]
const minor_scale = [1, 3, 4, 6, 8, 9, 11]
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
const rest = 'REST'

function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max))
}

function rotate_array<T>(arr: T[], count: number) {
    var len = arr.length >>> 0,
        count = count >> 0

    arr.unshift(arr.splice(count % len, len) as any)
    return arr
}

export default function GenerateMusic({ bars, timeSignature, key, generations }: input) {
    const notes_per_bar = timeSignature[1] * 2

    // generate the initial value
    let bestFit: number[][] = []

    const to_rotate = key.endsWith('m') ? minor_scale.map((i) => notes[i - 1]) : major_scale.map((i) => notes[i - 1])
    const amount = notes.findIndex((value) => value.startsWith(key.substr(0, 1).toLowerCase()))

    let notes_in_key = rotate_array(to_rotate, amount)

    // change this to generate from the seed
    for (let i = 0; i < bars * notes_per_bar; i++) {
        bestFit.push([getRandomInt(notes_in_key.length)])
    }

    for (let j = 0; j < generations; j++) {
        let mutated: number[][][] = []

        // mutation types
        // 1. note moved up or down by 1
        //// 3. change timing on note to be longer or short and add a rest or remove another consecutive note
        // 4. create a chord with a note one octave down making the other two notes wholes
        // 5. sequences of notes // not sure what I meant by this

        for (let k = 0; k < bestFit.length; k++) {
            let current_index = mutated.length
            mutated.push(bestFit.slice(0))
            mutated[current_index][k] =
                mutated[current_index][k].length === 1 ? [mutated[current_index][k][0] === 6 ? 0 : mutated[current_index][k][0] + 1] : mutated[current_index][k] // up a note in the key

            current_index = mutated.length
            mutated.push(bestFit.slice(0))
            mutated[current_index][k] =
                mutated[current_index][k].length === 1 ? [mutated[current_index][k][0] === 0 ? 6 : mutated[current_index][k][0] - 1] : mutated[current_index][k] // down a note in the key
        }

        for (let k = 0; k < bestFit.length; k++) {
            if (bestFit[k].length === 1) {
                for (let j = 0; j < notes_in_key.length; j++) {
                    let current_index = mutated.length
                    mutated.push(bestFit.slice(0))
                    mutated[current_index][k] = [mutated[current_index][k][0], j]
                }

                for (let j = 0; j < notes_in_key.length ** 2; j++) {
                    let current_index = mutated.length
                    mutated.push(bestFit.slice(0))
                    mutated[current_index][k] = [mutated[current_index][k][0], j % 7, Math.trunc(j / 7)]
                }
            }
        }

        bestFit = evaluate(mutated, notes_per_bar)

        // evaluate best option
        //bestFit = evaluate(mutated, key);
    }

    console.log(bestFit)

    const result = bestFit.map((nts) => {
        if (nts.length === 1) {
            return '[' + notes_in_key[nts[0]] + ']'
        } else {
            return (
                '[' +
                notes_in_key[nts[0]] +
                nts
                    .slice(1)
                    .map((i) => notes_in_key[i] + ',' + notes_per_bar)
                    .join(' ') +
                ']'
            )
        }
    })

    console.log(result)

    return result
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
function evaluate(mutations: number[][][], notes_per_bar: number) {
    const evaluations: { value: number; index: number }[] = []
    for (let i = 0; i < mutations.length; i++) {
        let score = 0

        let number_of_chords = 0
        let last_chord_index = -notes_per_bar
        for (let j = 0; j < mutations[i].length; j++) {
            if (mutations[i][j].length > 1) {
                number_of_chords++
                const dist_last_chord = j - last_chord_index
                score -= Math.abs(dist_last_chord - notes_per_bar)
                last_chord_index = j
            }
        }
        score -= Math.abs(number_of_chords - mutations[0].length / notes_per_bar)

        for (let j = 0; j < mutations[i].length; j++) {
            const current_chord = mutations[i][j]

            const sorted = current_chord.slice(0).sort()
            const dist1 = sorted[1] - sorted[0]
            if (sorted.length > 2) {
                const dist2 = sorted[2] - sorted[1]

                if (dist1 === 1) {
                    score -= 5
                } else {
                    score += -Math.abs(dist1 - 2) + 1
                }

                if (dist2 === 1) {
                    score -= 5
                } else {
                    score += -Math.abs(dist2 - 2) + 1
                }
            } else if (sorted.length === 2) {
                if (dist1 === 1) {
                    score -= 5
                } else {
                    score += -Math.abs(dist1 - 2) + 1
                }
            }
        }
        evaluations.push({ value: score, index: i })
    }

    return mutations[evaluations.sort((a, b) => b.value - a.value)[0].index]
}
