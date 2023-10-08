
const playingField = document.querySelector('.container');

function createUnit (row, coloumn) {
    const unit = document.createElement('div');
    unit.classList.add('unit');
    playingField.append(unit);
    let num = ((row * 4) + coloumn + 1);
    unit.innerHTML = `<span>${num}</span>`;
    unit.id = 'u' + num;
    unit.style.top = row * 25 + '%';
    unit.style.left = coloumn * 25 + '%';
}

let matrix = [];

for (let i = 0; i < 4; i++) {
    matrix[i] = new Array;
    for (let j = 0; j < 4; j++) {
        matrix[i][j] = (i * 4) + j + 1;
        createUnit (i, j);
    }
}

let iEmpty = 3;
let jEmpty = 3;

function down() {
    }