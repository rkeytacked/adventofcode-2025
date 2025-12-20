#!/usr/bin/env node
const {log, max, min, toNumber, key, readLines, split} = require("./common");

/* * * * * * * *
 * * DAY  10 * *
 * * * * * * * */

let input = readLines('../inputs/10.txt', split(/[\[\](){}\s]+/g));

const GeneratorFunction = function* () {
}.constructor;

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function findMinimumForTarget(buttons, target) {
    const targetKey = key(target);
    let start = target.map(() => false);
    const visited = {[key(start)]: 0};
    const toVisit = [start];
    while (toVisit.length > 0) {
        let next = toVisit.shift();
        let nextKey = key(next);
        let nrSteps = visited[nextKey];
        if (nextKey === targetKey) {
            return nrSteps;
        }
        for (let btn of buttons) {
            let switched = next.slice();
            for (let pos of btn) {
                switched[pos] = !switched[pos];
            }
            const switchedKey = key(switched);
            let currMinSteps = visited[switchedKey] ?? (nrSteps + 2);
            if ((nrSteps + 1) < currMinSteps) {
                visited[switchedKey] = nrSteps + 1;
                toVisit.push(switched);
            }
        }
    }
}

let countPresses1 = 0;
let countPresses2 = 0;

for (const line of input) {
    line.shift();
    line.pop();
    const target = [...line.shift()].map(c => c === '#');
    const joltage = line.pop().split(',').map(toNumber);
    const buttons = line.map(btn => btn.split(',').map(toNumber));

    countPresses1 += findMinimumForTarget(buttons, target);
    countPresses2 += findMinimumForJoltage(buttons, joltage);
}

log('solution #1:', countPresses1);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function gaussJordan(matrix, epsilon = 1e-10) {
    const m = matrix.length;           // Zeilen
    const n = matrix[0].length - 1;    // Variablen (ohne rechte Seite)

    let pivotRow = 0;
    const pivotColumns = [];

    for (let col = 0; col < n && pivotRow < m; col++) {

        // 1. find pivot row
        let pivot = -1;
        for (let row = pivotRow; row < m; row++) {
            if (Math.abs(matrix[row][col]) > epsilon) {
                pivot = row;
                break;
            }
        }

        // possible free variable
        if (pivot === -1) continue;

        // 2. swap rows
        [matrix[pivotRow], matrix[pivot]] =
            [matrix[pivot], matrix[pivotRow]];

        // 3. normalize pivot
        const pivotValue = matrix[pivotRow][col];
        for (let j = 0; j < n + 1; j++) {
            matrix[pivotRow][j] /= pivotValue;
        }

        // 4. eliminate column (up and down)
        for (let r = 0; r < m; r++) {
            if (r !== pivotRow) {
                const factor = matrix[r][col];
                for (let j = 0; j < n + 1; j++) {
                    matrix[r][j] -= factor * matrix[pivotRow][j];
                }
            }
        }

        pivotColumns.push(col);
        pivotRow++;
    }

    // 5. check consistency
    for (let i = 0; i < m; i++) {
        let allZero = true;
        for (let j = 0; j < n; j++) {
            if (Math.abs(matrix[i][j]) > epsilon) {
                allZero = false;
                break;
            }
        }
        if (allZero && Math.abs(matrix[i][n]) > epsilon) {
            throw "inconsistent";
        }
    }

    // 6. determine free variables
    const freeVariables = [];
    for (let j = 0; j < n; j++) {
        if (!pivotColumns.includes(j)) {
            freeVariables.push(j);
        }
    }

    return {
        rref: matrix,
        pivotColumns,
        freeVariables
    };
}

function createJsFunction(pivotColumns, rref, freeVariables, buttons, joltage) {
    const maxValue = max(joltage);

    const jsEquations = pivotColumns.map((pivot, i) => `x${pivot} = ` + [rref[i][buttons.length], ...freeVariables.map(free => `(${rref[i][free]}*x${free})`)].join(' - '));
    const jsCondition = buttons.map((_, i) => `isNonNegativeInteger(x${i})`).join(' && ');
    const jsSum = 'Math.round(' + buttons.map((_, i) => `x${i}`).join(' + ') + ')';

    let jsBody = `
        const isNonNegativeInteger = val => (val >= -epsilon) && Math.abs(val - Math.round(val)) < epsilon;
        ${jsEquations.join(';\n')};
        if (${jsCondition}) {
            yield (${jsSum});
        }
        `;
    for (let free of freeVariables) {
        jsBody = `for (let x${free} = 0; x${free} <= ${maxValue}; x${free}++) {
            ${jsBody}
        }
        `;
    }

    return new GeneratorFunction('epsilon = 1e-10', jsBody);
}

function findMinimumForJoltage(buttons, joltage) {
    const matrix = joltage.map((j, nr) => [...buttons.map(btn => btn.includes(nr) ? 1 : 0), j]);

    const {pivotColumns, rref, freeVariables} = gaussJordan(matrix);

    const jsFunction = createJsFunction(pivotColumns, rref, freeVariables, buttons, joltage);
    return min(jsFunction());
}

log('solution #2:', countPresses2);
