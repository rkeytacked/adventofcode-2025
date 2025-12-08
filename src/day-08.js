#!/usr/bin/env node
const {log, readLines, toNumber, split, unique, prod} = require("./common");

/* * * * * * * *
 * * DAY  08 * *
 * * * * * * * */

let input = readLines('../inputs/08.txt', split(',', toNumber));
const numberOfDistancesToCheckFirst = 10; // 1000;

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const distances = [];

for (let i = 0; i < input.length; i++) {
    const [x, y, z] = input[i];
    for (let j = i + 1; j < input.length; j++) {
        const [a, b, c] = input[j];
        distances.push({dist: (x - a) * (x - a) + (y - b) * (y - b) + (z - c) * (z - c), ids: [i, j]});
    }
}

distances.sort((a, b) => a.dist - b.dist);

const circuits = input.map((_, id) => [id]);

function connectCircuits(a, b) {
    if (circuits[a] !== circuits[b]) {
        if (circuits[a].length < circuits[b].length) {
            [a, b] = [b, a];
        }
        circuits[a].push(...circuits[b]);
        for (let c of circuits[b]) {
            circuits[c] = circuits[a];
        }
    }
}

for (let {ids: [a, b]} of distances.slice(0, numberOfDistancesToCheckFirst)) {
    connectCircuits(a, b);
}

const threeBiggestCircuits = unique(circuits).toSorted((a, b) => b.length - a.length).slice(0, 3);

log('solution #1:', prod(threeBiggestCircuits.map(a => a.length)));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

for (let {ids: [a, b]} of distances.slice(numberOfDistancesToCheckFirst)) {
    connectCircuits(a, b);
    if (circuits[a].length === input.length) {
        log('solution #2:', input[a][0] * input[b][0]);
        break;
    }
}
