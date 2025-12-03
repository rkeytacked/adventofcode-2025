#!/usr/bin/env node
const {log, sum, readCharArrays, toNumber} = require("./common");

/* * * * * * * *
 * * DAY  03 * *
 * * * * * * * */

let input = readCharArrays('../inputs/03.txt', toNumber);

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function maxIndex(arr, from = 0, to = arr.length) {
    let maxPos = -1;
    for (let i = from; i < to; i++) {
        if (maxPos < 0 || arr[i] > arr[maxPos]) {
            maxPos = i;
        }
    }
    return maxPos;
}

function maxNumber(arr, count = 2) {
    let result = '';
    let lowerIndex = 0;
    for (let c = 1; c <= count; c++) {
        let m = maxIndex(arr, lowerIndex, arr.length - count + c);
        result += arr[m];
        lowerIndex = m + 1;
    }
    return Number(result);
}

log('solution #1:', sum(input.map(line => maxNumber(line))));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

log('solution #2:', sum(input.map(line => maxNumber(line, 12))));
