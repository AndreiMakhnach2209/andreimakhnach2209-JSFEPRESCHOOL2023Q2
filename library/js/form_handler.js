const formRegister = document.forms.register;
let newUserData = {};
let newCardNumber = '';

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
        const hexNum = Math.floor(Math.random() * 17)
                        .toString(16)
                        .toUpperCase();
        numCard += hexNum;
    }
    return numCard;
}



formRegister.addEventListener('submit', (event) => {
    event.preventDefault();
    newUserData = userDataReceive( formRegister );
    console.log(newUserData);
})
