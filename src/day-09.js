#!/usr/bin/env node
const {log, readLines, max, toNumber, split, sort, unique, map} = require("./common");

/* * * * * * * *
 * * DAY  09 * *
 * * * * * * * */

const coords = readLines('../inputs/09.txt', split(',', toNumber));


/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function area(x1, y1, x2, y2) {
    return (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
}

const allAreas = coords.flatMap(([x, y]) => coords.map(([a, b]) => area(x, y, a, b)));

log('solution #1:', max(allAreas));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

const xValues = sort(unique(coords.map(([x]) => x)));
const yValues = sort(unique(coords.map(([, y]) => y)));

const xValuesLookup = map(xValues.map((x, i) => [x, i]));
const yValuesLookup = map(yValues.map((y, i) => [y, i]));

const floor = yValues.map(() => xValues.map(() => false));

function toFloor([x, y]) {
    return [xValuesLookup[x], yValuesLookup[y]];
}

for (let i = 0; i < coords.length; i++) {
    const [x1, y1] = toFloor(coords[i]);
    const [x2, y2] = toFloor(coords[(i + 1) % coords.length]);
    const [dx, dy] = [Math.sign(x2 - x1), Math.sign(y2 - y1)];
    for (let x = x1 + dx, y = y1 + dy; x !== x2 || y !== y2; x += dx, y += dy) {
        floor[y][x] = 'X';
    }
    floor[y2][x2] = 'X';
}

for (let i = 0; i < coords.length; i++) {
    const [x1, y1] = toFloor(coords[i]);
    const [x2, y2] = toFloor(coords[(i + 1) % coords.length]);
    const [dx, dy] = [Math.sign(x2 - x1), Math.sign(y2 - y1)];
    for (let x = x1 + dx, y = y1 + dy; x !== x2 || y !== y2; x += dx, y += dy) {
        for (let a = x - dy, b = y + dx; floor[b][a] !== 'X'; a -= dy, b += dx) {
            floor[b][a] = 'x';
        }
    }
}

function allOnFloor(x1, y1, x2, y2) {
    [x1, y1] = toFloor([x1, y1]);
    [x2, y2] = toFloor([x2, y2]);
    [x1, x2] = [Math.min(x1, x2), Math.max(x1, x2)];
    [y1, y2] = [Math.min(y1, y2), Math.max(y1, y2)];
    for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
            if (!floor[y][x]) {
                return false;
            }
        }
    }
    return true;
}

const insideAreas = coords.flatMap(([x, y]) => coords.filter(([a, b]) => allOnFloor(x, y, a, b)).map(([a, b]) => area(x, y, a, b)));

log('solution #2:', max(insideAreas));
