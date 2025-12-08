#!/usr/bin/env node
const {log, sum, readCharArrays, forEach} = require("./common");

/* * * * * * * *
 * * DAY  07 * *
 * * * * * * * */

const input = readCharArrays('../inputs/07.txt');
const startX = input[0].indexOf('S');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let nrSplittings = 0;

const beams = {[startX]: 1};

for (let i = 1; i < input.height; i++) {
    forEach(input[i], '^', x => {
        if (beams[x]) {
            beams[x - 1] = (beams[x - 1] ?? 0) + beams[x];
            beams[x + 1] = (beams[x + 1] ?? 0) + beams[x];
            beams[x] = 0;
            nrSplittings++;
        }
    });
}

log('solution #1:', nrSplittings);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

log('solution #2:', sum(Object.values(beams)));
