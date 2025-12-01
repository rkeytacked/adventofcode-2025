#!/usr/bin/env node
const {log, readLines} = require("./common");

/* * * * * * * *
 * * DAY  01 * *
 * * * * * * * */

const diffs = readLines('../inputs/01.txt', s => (s[0] === 'R' ? 1 : -1) * s.substring(1));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function countZeros(input, start = 50) {
    let countZero = 0;
    for (let diff of input) {
        start += diff;
        while (start < 0) {
            start += 100;
        }
        start = start % 100;
        if (start === 0) {
            countZero++;
        }
    }
    return countZero;
}

log('solution #1:', countZeros(diffs, 50));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function countZeroClicks(input, start = 50) {
    let countZero = 0;
    for (let diff of input) {
        if (start === 0 && diff < 0) {
            start = 100;
        }
        start += diff;
        while (start < 0) {
            start += 100;
            countZero++;
        }
        while (start > 100) {
            start -= 100;
            countZero++;
        }
        start = start % 100;
        if (start === 0) {
            countZero++;
        }
    }
    return countZero;
}

log('solution #2:', countZeroClicks(diffs, 50));
