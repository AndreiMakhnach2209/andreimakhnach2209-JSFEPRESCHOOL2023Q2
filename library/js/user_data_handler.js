function userVerification (data) {
    return !(Object.keys(localStorage).includes(data.email));
}

function displayingInfoCard (email) {
    const userDataTemp = JSON.parse(localStorage.getItem(email));
    valuesCardinfo[1].innerHTML = userDataTemp.visits;
    valuesCardinfo[3].innerHTML = userDataTemp.bonuses;
    valuesCardinfo[5].innerHTML = userDataTemp.books.length;
    buttonCardChecker.classList.add('nodisplay');
    infoCardChecker.classList.remove('nodisplay');
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
    displayingInfoCard(data.email);
    const inputsCard = document.querySelectorAll('.card-input-box input');
    inputsCard[0].setAttribute('value', data.firstname + ' ' + data.lastname);
    inputsCard[1].setAttribute('value', data.cardNumber);
    inputsCard.forEach(item => item.setAttribute('disabled', ''));
    document.querySelector('.card-login-box h3').innerHTML = 'Visit your profile';
    document.querySelector('.card-login-box p').innerHTML = 'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.';
    document.querySelectorAll('.card-login-box button').forEach(item => item.classList.toggle('nodisplay'));
}

if (localStorage.getItem('activeUser')) {
    activeUser = JSON.parse(localStorage[localStorage.activeUser]);
    userActivation(activeUser);
}



