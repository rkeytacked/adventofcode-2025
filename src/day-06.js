#!/usr/bin/env node
const {log, readLines, toNumber, sum, prod, range, shiftUntil} = require("./common");

/* * * * * * * *
 * * DAY  06 * *
 * * * * * * * */

const input = readLines('../inputs/06.txt');
const operations = input.pop().trim().split(/\s+/g);

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let lines = input.map(line => line.trim().split(/\s+/g));
let grandTotal = sum(operations.map(op => (op === '*' ? prod : sum)(lines.map(line => line.shift()).map(toNumber))));

log('solution #1:', grandTotal);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

lines = range(input[0].length).map(i => input.map(line => line[i]).join('').trim());
grandTotal = sum(operations.map(op => (op === '*' ? prod : sum)(shiftUntil(lines).map(toNumber))));

log('solution #2:', grandTotal);
