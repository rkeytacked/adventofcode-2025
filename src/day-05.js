#!/usr/bin/env node
const {log, readLines, sum, toNumber, split, shiftUntil} = require("./common");

/* * * * * * * *
 * * DAY  05 * *
 * * * * * * * */

const input = readLines('../inputs/05.txt');
const ranges = shiftUntil(input).map(split('-', toNumber));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const freshIds = input.map(toNumber).filter(id => ranges.some(([from, to]) => from <= id && to >= id));

log('solution #1:', freshIds.length);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

for (const range of ranges) {
    for (const other of ranges) {
        if (range === other || !other.length || !range.length) continue;
        const [from, to] = range;
        const [a, b] = other;
        if (to < a || from > b) continue;
        if (from >= a && to <= b) { // delete range
            range.length = 0;
        } else if (from <= a && to >= b) { // delete other
            other.length = 0;
        } else if (from < a) { // overlap left
            range[1] = Math.min(to, a - 1);
        } else if (to > b) { // overlap right
            range[0] = Math.max(from, b + 1);
        }
    }
}

function rangeSize([a,b]) {
    return (!a || !b) ? 0 : b-a+1;
}

log('solution #2:', sum(ranges.map(rangeSize)));
