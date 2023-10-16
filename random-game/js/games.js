
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
    updateScoreTable();
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
    return `${mm}:${ss}`;
}

let timerId;

function startGame () {
    let x = 0;
    switch (level) {
        case 'weryEasy' : x = 10;
        break;
        case 'easy' : x = 50;
        break;
        case 'normal' : x = 100;
        break;
        case 'hard' : x = 1000;
        break;
    }
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
    units.forEach(item => {
        item.addEventListener('transitionend', checking);
    })
    timerId = setInterval(() => {
        timerValue++;
        timer.innerHTML = 'Время : ' + secToMMSS(timerValue);
    }, 1000);
}

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
    menu.classList.add('no-display');
    startGame();
})

menu.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
        menu.classList.add('opacity');
        menu.classList.add('no-display');
        startGame();
    }
})

let nameUser;
const inputName = document.querySelector('.user-name');

inputName.addEventListener('input', (event) => {
    nameUser = event.target.value;
})


function updateScoreTable () {
    let timeTable = new Object;
    let scoreTable = new Object;

    //timeTable = {level : [{pos : [user, time]} ... ]}
    if (!nameUser) nameUser = 'Аноним'
    if (localStorage.getItem('time')) {
        timeTable = JSON.parse(localStorage.getItem('time'));
        scoreTable = JSON.parse(localStorage.getItem('score'));
    }    
    if (!timeTable[level]) {
        timeTable[level] = [[nameUser, timerValue]];
        scoreTable[level] = [[nameUser, stepsValue]];
    }else{
        timeTable[level].push([nameUser, timerValue]);
        scoreTable[level].push([nameUser, stepsValue]);
        timeTable[level].sort((a, b) => a[1] - b[1]);
        scoreTable[level].sort((a, b) => a[1] - b[1]);
    }
    localStorage.setItem('time', JSON.stringify(timeTable));
    localStorage.setItem('score', JSON.stringify(scoreTable));
}

const scoreBtn = document.querySelector('.score-link');
const recordTable = document.querySelector('.score-table');
const recordsLevel = document.querySelector('.score-title');
const recordsLists = document.querySelectorAll('.score-list');
const recordsListBox = document.querySelector('score-list-box');

function createRecordScore (i) {
    const scoreItem = document.createElement('span');
    scoreItem.classList.add('score-item');
    recordsLists[0].append(scoreItem);
    scoreItem.innerHTML = `<p>${i + 1} : ${scoreTable[level][i][0]} -- ${scoreTable[level][i][1]}</p>`;
}
function createRecordTime (i) {
    const scoreItem = document.createElement('span');
    scoreItem.classList.add('score-item');
    recordsLists[1].append(scoreItem);
    scoreItem.innerHTML = `<p>${i + 1} : ${timeTable[level][i][0]} -- ${secToMMSS(timeTable[level][i][1])}</p>`;
}

function openRecords(lev) {
        switch (lev) {
        case 'weryEasy' : recordsLevel.innerHTML = 'Очень легкий';
        break;
        case 'easy' : recordsLevel.innerHTML = 'Легкий';
        break;
        case 'normal' : recordsLevel.innerHTML = 'Нормальный';
        break;
        case 'hard' : recordsLevel.innerHTML = 'Сложный';
        break;
    }
    const scoreItems = document.querySelectorAll('.score-item');
    scoreItems.forEach(item => item.remove());

    if (localStorage.getItem('time')) {
        timeTable = JSON.parse(localStorage.getItem('time'));
        scoreTable = JSON.parse(localStorage.getItem('score'));
        if (timeTable[level]) {
            for (let i = 0; i < 10; i++) {
                if (timeTable[level][i]) {
                    createRecordScore(i);
                    createRecordTime(i);
                }
            }
        }else{
            const noRes = document.createElement('div');
            noRes.classList.add('score-item', 'result');
            noRes.innerHTML = 'Нет результатов предыдущих игр'
            recordTable.append(noRes);
        }
    }else{
        const noRes = document.createElement('div');
        noRes.classList.add('score-item', 'result');
        noRes.innerHTML = 'Нет результатов предыдущих игр'
        recordTable.append(noRes);
    }
    recordTable.classList.remove('no-display');
    recordTable.classList.remove('opacity');
};

function closeRecords () {
    recordTable.classList.add('opacity');
    recordTable.classList.add('no-display');
    const scoreItems = document.querySelectorAll('.score-item');
    scoreItems.forEach(item => item.remove());
}

scoreBtn.addEventListener('click', () => {
    openRecords(level);
})

menu.addEventListener('click', closeRecords, true);

const levels = ['weryEasy', 'easy', 'normal', 'hard'];
let levelIn = 0,
    level = levels[levelIn];


const scoreBackBtn = document.querySelector('.score-back'),
      scoreForwBtn = document.querySelector('.score-forward');

scoreBackBtn.addEventListener('click', () => {
    levelIn = (levelIn > 0) ? levelIn - 1 : 3;
    level = levels[levelIn];
    openRecords(level);
    levelBtns[levelIn].checked = true;
})

scoreForwBtn.addEventListener('click', () => {
    levelIn = (levelIn < 3) ? levelIn + 1 : 0;
    level = levels[levelIn];
    openRecords(level);
    levelBtns[levelIn].checked = true;
})

const levelBtns = document.querySelectorAll('.radio-level'),
      soundBtns = document.querySelectorAll('.radio-sound');

levelBtns.forEach((item, index) => {
    item.addEventListener('click', () => {
        level = levels[index];
        console.log(level);
    })
})
// localStorage.clear();