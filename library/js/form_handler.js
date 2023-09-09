const formRegister = document.forms.register;
let activeUser = {};
const formCardChecker = document.forms.libraryCardChecker;
const buttonCardChecker = document.querySelector('.card-input-border button');
const infoCardChecker = document.querySelector('.library-card-info');
const valuesCardinfo = document.querySelectorAll('.card-info-item span');
const formLogin = document.forms.login;

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

formRegister.addEventListener('submit', (event) => {
    event.preventDefault();
    const newUserData = userDataReceive(formRegister);
    if (userVerification(newUserData)) {
        do {
            newUserData.cardNumber = cardNumberGenerator();
        } while (Object.keys(localStorage).includes(newUserData.cardNumber));
        newUserData.email = newUserData.email.toLowerCase();
        newUserData.firstname = newUserData.firstname[0].toUpperCase() + newUserData.firstname.slice(1).toLowerCase();
        newUserData.lastname = newUserData.lastname[0].toUpperCase() + newUserData.lastname.slice(1).toLowerCase();
        newUserData.visits = 1;
        newUserData.books = [];
        newUserData.bonuses = 100;
        newUserData.icon = newUserData.firstname[0].toUpperCase() + newUserData.lastname[0].toUpperCase();
        activeUser = Object.assign({}, newUserData);
        localStorage.setItem(newUserData.email, JSON.stringify(newUserData));
        localStorage.setItem(newUserData.cardNumber, newUserData.email);
        localStorage.setItem('activeUser', newUserData.email);
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
            displayingInfoCard(email);
            setTimeout(() => {
                buttonCardChecker.classList.remove('nodisplay')
                infoCardChecker.classList.add('nodisplay')
                formCardChecker.reset();                
            }, 10000);
        }else{
            alert('invalid card number or user name');
        }
    }else{
        alert('invalid card number or user name');
    }
})

formLogin.addEventListener('submit', (event) => {
    event.preventDefault();
    let login = userDataReceive(formLogin).user_login;
    const password = userDataReceive(formLogin).password;
    if (Object.keys(localStorage).includes(login.toUpperCase())) {
        login = localStorage.getItem(login);
    }
    if (Object.keys(localStorage).includes(login.toLowerCase())) {
        const userDataTemp = JSON.parse(localStorage[login.toLowerCase()]);
        if (userDataTemp.password === password) {
            activeUser = Object.assign({}, userDataTemp);
            userActivation(activeUser);
            event.target.reset();
            closingModal();
        }else{
            alert('invalid password');
        }
    }else{
        alert('invalid card number or user E-mail');
    }
})

// localStorage.clear()