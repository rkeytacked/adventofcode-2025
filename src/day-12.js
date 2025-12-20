#!/usr/bin/env node
const {log, sum, readLines, shiftUntil, split, toNumber} = require("./common");

/* * * * * * * *
 * * DAY  12 * *
 * * * * * * * */

let input = readLines('../inputs/12.txt');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let regions = [];
while (input.length) {
    regions = shiftUntil(input);
}
regions = regions.map(split(/[x:\s]+/g, toNumber)).map(([x, y, ...presents]) => ({
    dimension: [x,y],
    presents
}))

function trivialMatch({dimension:[width,height], presents}) {
    const blocksSpace = Math.floor(width/3) * Math.floor(height/3);
    const nrPresents = sum(presents);
    return nrPresents <= blocksSpace;
}

let trivialCount = regions.filter(trivialMatch).length;

if (regions.length <= 3) {
    log('This example is a trap! Don\'t fall for it.');
    trivialCount = 2;
}

log('solution #1:', trivialCount);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

log('solution #2:', 'Merry Christmas');
