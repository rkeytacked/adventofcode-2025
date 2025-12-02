#!/usr/bin/env node
const {log, readLines, sum, split, unique} = require("./common");

/* * * * * * * *
 * * DAY  02 * *
 * * * * * * * */

const input = [...splitRanges(readLines('../inputs/02.txt', split('-'), ','))];

function* splitRanges(input) {
    for (const [from, to] of input) {
        if (from.length < to.length) {
            let border = 10 ** from.length;
            yield [from, String(border - 1)];
            yield [String(border), to];
        } else {
            yield [from, to];
        }
    }
}

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function* findInvalids([from, to]) {
    let fromHalf = from.substring(0, Math.ceil(from.length / 2));
    let toHalf = to.substring(0, fromHalf.length);
    let invalidFrom = Number(fromHalf);
    let invalidTo = Number(toHalf);
    from = Number(from);
    to = Number(to);
    for (let i = invalidFrom; i <= invalidTo; i++) {
        let n = Number(`${i}${i}`);
        if (n >= from && n <= to) {
            yield n;
        }
    }
}

log('solution #1:', sum(unique(input.values().flatMap(findInvalids))));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function* findMoreInvalids([from, to]) {
    let fromNum = Number(from);
    let toNum = Number(to);
    for (let multi = 2; multi <= from.length; multi++) {
        let fromHalf = from.substring(0, Math.ceil(from.length / multi));
        let toHalf = to.substring(0, fromHalf.length);
        let invalidFrom = Number(fromHalf);
        let invalidTo = Number(toHalf);
        for (let i = invalidFrom; i <= invalidTo; i++) {
            let s = '';
            for (let j = 0; j < multi; j++) {
                s += i;
            }
            let n = Number(s);
            if (n >= fromNum && n <= toNum) {
                yield n;
            }
        }
    }
}

log('solution #2:', sum(unique(input.values().flatMap(findMoreInvalids))));
