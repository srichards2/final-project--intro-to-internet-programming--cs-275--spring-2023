let table = document.getElementById('table');
let matrix = []

window.onload = () => {
    let num;
    let valid = false;
    while (!valid) {
        num = prompt("Please enter a number greater than 2");
        if (num !== null) {
            const parsedNum = parseInt(num);
            if (!isNaN(parsedNum) && parsedNum > 2) {
                valid = true;
                const promises = [];
                for (let i = 0; i < parsedNum; i++) {
                    promises.push(addRow(parsedNum));
                }
                promise.all(promises)
                .then(() => console.log('Table created'))
                .catch(error => console.error('Error:', error));
            }
        } else {
            valid =true;
        }
    }
};

function createCell() {
    const cell = document.createElement('td');
    cell.textContent = '*';
    return cell;
};

function addRow(num) {
    return new promise((resolve, reject) => {
        const row = document.createElement('tr');
        for (let i =0; i < num; 1++) {
            row.appendChild(createCell());
        }
        table.appendChild(row);
        resolve();
    });
};

const createMatrix = (size) => {
    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        for (let j = 0; j < size; j++) {
            matrix[i][j] = i * size + j + 1;
        }
    }
};

const printMatrix = () => {
    console.log(matrix);
};

const reversedMatrix = () => {
    const size = matrix.length;
    let reversedMatrix = [];
    for (let i = 0; i < size; i++) {
        reversedMatrix.push([]);
        for (let j = 0; j < size; j++) {
            if (i === j) {
                reversedMatrix[i][j] = matrix[i][j];
            } else {
                reversedMatrix[i][j] = matrix[size - j - 1][size - i - 1];
            }
        }
    }
    matrix.splice(0, matrix.length, ...reversedMatrix);
    console.log('Matrix reversed');
};
