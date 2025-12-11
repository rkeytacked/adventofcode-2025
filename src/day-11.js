#!/usr/bin/env node
const {log, readLines, sum, split, map, cache, key} = require("./common");

/* * * * * * * *
 * * DAY  11 * *
 * * * * * * * */

const input = readLines('../inputs/11.txt', split(/[:\s]+/g));

const connections = map(input, line => [line.shift(), line]);

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const countPaths = cache((from, to) => {
    if (from === to) {
        return 1;
    }
    if (!connections[from]) {
        return 0;
    }
    return sum(connections[from].map(node => countPaths(node, to)));
}, key)

log('solution #1:', countPaths('you', 'out'));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let dacfft = countPaths('svr', 'dac') * countPaths('dac', 'fft') * countPaths('fft', 'out');
let fftdac = countPaths('svr', 'fft') * countPaths('fft', 'dac') * countPaths('dac', 'out');

log('solution #2:', dacfft + fftdac);
