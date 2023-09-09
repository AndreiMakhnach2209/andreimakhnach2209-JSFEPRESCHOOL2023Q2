const formRegister = document.forms.register;
let newUserData = {};
let activeUser = {};
const formCardChecker = document.forms.libraryCardChecker;
const buttonCardChecker = document.querySelector('.card-input-border button');
const infoCardChecker = document.querySelector('.library-card-info');


function userDataReceive(form) {
    const data = new FormData(form);
    const userDataTemp = {};
    data.forEach((value, key) => {
        userDataTemp[key] = value; 
    })
    return userDataTemp;
}

function cardNumberGenerator() {
    let numCard = '';
    for (let i = 0; i < 9; i++) {
        const hexNum = Math.floor(Math.random() * 16)
                        .toString(16)
                        .toUpperCase();
        numCard += hexNum;
    }
    return numCard;
}

function userVerification (data) {
    return !(Object.keys(localStorage).includes(data.email));
}

function userActivation (data) {
    userIcons.forEach(item => {
        item.classList.remove('nodisplay');
        item.innerHTML = data.icon;
        item.setAttribute('title', data.firstname + ' ' + data.lastname);
    });
    profileIcons.forEach(item => {
        item.classList.add('nodisplay');
    });
    dropButtons.forEach(item => {
        item.classList.toggle('nodisplay')
    })
    dropTitle.innerHTML = data.cardNumber;
    dropTitle.style.fontSize = '12px';
}

formRegister.addEventListener('submit', (event) => {
    event.preventDefault();
    newUserData = userDataReceive(formRegister);
    if (userVerification(newUserData)) {
        do {
            newUserData.cardNumber = cardNumberGenerator();
        } while (Object.keys(localStorage).includes(newUserData.cardNumber));
        newUserData.visits = 1;
        newUserData.books = [];
        newUserData.bonus = 100;
        newUserData.icon = newUserData.firstname[0] + newUserData.lastname[0]
        activeUser = Object.assign({}, newUserData);
        localStorage.setItem(newUserData.email, JSON.stringify(newUserData));
        localStorage.setItem(newUserData.cardNumber, newUserData.email);
        localStorage.setItem('activeUser', newUserData.email);
        newUserData = {};
        userActivation(activeUser);
        event.target.reset();
        closingModal();
    }else{
        alert('This email has already been registered!');
    }
})

dropButtons[3].addEventListener('click', () =>  { // button Log Out
    localStorage.removeItem('activeUser');
    location.reload();
})

formCardChecker.addEventListener('submit', (event) => {
    event.preventDefault();
    const number = userDataReceive(formCardChecker).number;
    const name = userDataReceive(formCardChecker).name;
    if (localStorage.getItem(number.toUpperCase())) {
        const email = localStorage.getItem(number.toUpperCase());
        const userDataTemp = JSON.parse(localStorage.getItem(email));
        if (name.toLowerCase() === (userDataTemp.firstname + ' ' + userDataTemp.lastname).toLowerCase()) {
            buttonCardChecker.classList.add('nodisplay')
            infoCardChecker.classList.remove('nodisplay')
            setTimeout(() => {
                buttonCardChecker.classList.remove('nodisplay')
                infoCardChecker.classList.add('nodisplay')
                formCardChecker.reset();                
            }, 10000);
        }else{
            alert('invalid card number or user name')
        }
    }
})

// localStorage.clear()