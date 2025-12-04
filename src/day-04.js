#!/usr/bin/env node
const {log, readCharArrays, forEach2D, spanYX} = require("./common");

/* * * * * * * *
 * * DAY  04 * *
 * * * * * * * */

const input = readCharArrays('../inputs/04.txt');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function findMoveableRolls(callback = x => x) {
    forEach2D(input, '@', (x, y) => {
        let count = 0;
        for (const [j, i] of spanYX(y, x)) {
            if (input[j]?.[i] === '@') count++;
        }
        if (count <= 4) {
            callback(x, y);
        }
    });
}

let numMovable = 0;
findMoveableRolls(() => numMovable++);

log('solution #1:', numMovable);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let numTotal = 0;
for (let found = true; found;) {
    found = false;
    findMoveableRolls((x, y) => {
        numTotal++;
        found = true;
        input[y][x] = 'x';
    });
}

log('solution #2:', numTotal);
