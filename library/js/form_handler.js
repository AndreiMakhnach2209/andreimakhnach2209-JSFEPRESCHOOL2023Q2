const formRegister = document.forms.register;
let newUserData = {};
let activeUser = {};


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
        console.log(hexNum)
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
        newUserData.icon = newUserData.firstname[0] + newUserData.lastname[0]
        activeUser = Object.assign({}, newUserData);
        localStorage.setItem(newUserData.email, JSON.stringify(newUserData));
        localStorage.setItem(newUserData.cardNumber, newUserData.email);
        newUserData = {};
        userActivation(activeUser);
        event.target.reset();
        closingModal();
    }else{
        alert('This email has already been registered!');
    }
    console.log(newUserData , activeUser);
})
localStorage.clear()