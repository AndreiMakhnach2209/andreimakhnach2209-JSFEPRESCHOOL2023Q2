
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

const units = document.querySelectorAll('.unit');
let iEmpty = 3;
let jEmpty = 3;

function shiftUnit(a, b) {
    const unit = document.getElementById('u' + matrix[iEmpty + a][jEmpty + b]);
    unit.style.top = iEmpty * 25 + '%';
    unit.style.left = jEmpty * 25 + '%';
    matrix[iEmpty][jEmpty] = matrix[iEmpty + a][jEmpty + b];
    iEmpty = iEmpty + a;
    jEmpty = jEmpty + b;
    matrix[iEmpty][jEmpty] = 16;
}

function checking() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (matrix[i][j] !== (i * 4) + j + 1) return;
        }
    }
    alert('Поздравляем!!!')
}

document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'ArrowUp':
            if (iEmpty < 3) shiftUnit(1, 0);
            break;
        case 'ArrowDown':
            if (iEmpty) shiftUnit(-1, 0);
            break;
        case 'ArrowRight':
            if (jEmpty) shiftUnit(0, -1);
            break;
        case 'ArrowLeft': 
            if (jEmpty < 3) shiftUnit(0, 1);
    }
})

function startGame (x) {
    for (let i = 0; i < x; i++) {
        let r = Math.floor(Math.random() * 4);
        switch (r) {
            case 0:
                if (iEmpty < 3) shiftUnit(1, 0);
                else i = i--;
                break;
            case 1:
                if (iEmpty) shiftUnit(-1, 0);
                else i = i--;
                break;
            case 2:
                if (jEmpty) shiftUnit(0, -1);
                else i = i--;
                break;
            case 3: 
                if (jEmpty < 3) shiftUnit(0, 1);
                else i = i--;
        }
    }
}


document.addEventListener('click', () => startGame(10));

units.forEach(item => {
    item.addEventListener('transitionend', () => checking());
})
