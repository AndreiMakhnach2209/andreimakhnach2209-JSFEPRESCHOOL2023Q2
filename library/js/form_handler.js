const formRegister = document.forms.register;
let newUserData = {};

function userDataReceive(form) {
    const data = new FormData(form);
    const userDataTemp = {};
    data.forEach((value, key) => {
        userDataTemp[key] = value; 
    })
    return userDataTemp;
}


formRegister.addEventListener('submit', (event) => {
    event.preventDefault();
    newUserData = userDataReceive( formRegister );
    console.log(newUserData);
})

for (let i = 0, i < 9)
