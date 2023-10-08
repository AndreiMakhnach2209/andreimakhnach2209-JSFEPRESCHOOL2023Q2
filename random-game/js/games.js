
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
let stepsValue = 0;
const steps = document.querySelector('.score');

function shiftUnit(a, b) {
    const unit = document.getElementById('u' + matrix[iEmpty + a][jEmpty + b]);
    unit.style.top = iEmpty * 25 + '%';
    unit.style.left = jEmpty * 25 + '%';
    matrix[iEmpty][jEmpty] = matrix[iEmpty + a][jEmpty + b];
    iEmpty = iEmpty + a;
    jEmpty = jEmpty + b;
    matrix[iEmpty][jEmpty] = 16;
    stepsValue++;
    steps.innerHTML = (stepsValue < 10) ? `Ход:  00${stepsValue}` : (stepsValue < 100) ? `Ход:  0${stepsValue}` : `Ход:  ${stepsValue}`
}

let shiftUp = () => shiftUnit(-1, 0);
let shiftDown = () => shiftUnit(1, 0);
let shiftLeft = () => shiftUnit(0, -1);
let shiftRigth = () => shiftUnit(0, 1);

function checking() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (matrix[i][j] !== (i * 4) + j + 1) return;
        }
    }
    clearInterval(timerId);
    setTimeout(() => {
        alert('Поздравляем!!!')
    }, 500);
    units.forEach(item => {
        item.removeEventListener('transitionend', checking);
    })
}

document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'ArrowUp':
            if (iEmpty < 3) shiftDown();
            break;
        case 'ArrowDown':
            if (iEmpty) shiftUp();
            break;
        case 'ArrowRight':
            if (jEmpty) shiftLeft();
            break;
        case 'ArrowLeft': 
            if (jEmpty < 3) shiftRigth();
    }
})

const timer = document.querySelector('.timer');
let timerValue = 0;

let secToMMSS = (s) => {
    const mm = Math.floor(s / 60).toString();
    const ss = ((s % 60) < 10) ? '0'+ (s % 60) : (s % 60).toString();
    return `Время: ${mm}:${ss}`;
}

let timerId;

function startGame (x) {
    for (let i = 0; i < x; i++) {
        let r = Math.floor(Math.random() * 4);
        stepsValue = -1;
        switch (r) {
            case 0:
                if (iEmpty < 3) shiftDown();
                else i--;
                break;
            case 1:
                if (iEmpty) shiftUp();
                else i--;
                break;
            case 2:
                if (jEmpty) shiftLeft();
                else i--;
                break;
            case 3: 
                if (jEmpty < 3) shiftRigth();
                else i--;
        }
    }
    timerId = setInterval(() => {
        timerValue++;
        timer.innerHTML = secToMMSS(timerValue);
    }, 1000);
}

units.forEach(item => {
    item.addEventListener('transitionend', checking);
})

function unitsActivation() {
    if (iEmpty){
        const topUnit = document.getElementById('u' + matrix[iEmpty - 1][jEmpty]);
        topUnit.addEventListener('click', shiftUp);
        topUnit.classList.add('active');
    }
    if (iEmpty < 3){
        const bottomUnit = document.getElementById('u' + matrix[iEmpty + 1][jEmpty]);
        bottomUnit.addEventListener('click',shiftDown);
        bottomUnit.classList.add('active');
    }
    if (jEmpty){
        const leftUnit = document.getElementById('u' + matrix[iEmpty][jEmpty - 1]);
        leftUnit.addEventListener('click', shiftLeft);
        leftUnit.classList.add('active');
    }
    if (jEmpty < 3){
        const rigthUnit = document.getElementById('u' + matrix[iEmpty][jEmpty + 1]);
        rigthUnit.addEventListener('click', shiftRigth);
        rigthUnit.classList.add('active');
    }
} 

function unitsDeactivation () {
    document.querySelectorAll('.active').forEach (item => {
        item.removeEventListener('click', shiftDown);
        item.removeEventListener('click', shiftUp);
        item.removeEventListener('click', shiftLeft);
        item.removeEventListener('click', shiftRigth);
        item.classList.remove('active');
    })
}

playingField.addEventListener('transitionend', () => {
    unitsDeactivation();
    unitsActivation();
});

const startBtn = document.querySelector('.start');
const menu = document.querySelector('.background');
startBtn.addEventListener('click', () => {
    menu.classList.add('opacity');
    menu.addEventListener('transitionend', () => {
        menu.classList.add('no-display');
        startGame(10);
    })
})
