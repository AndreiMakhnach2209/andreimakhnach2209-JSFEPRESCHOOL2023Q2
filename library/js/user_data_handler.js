function userVerification (data) {
    return !(Object.keys(localStorage).includes(data.email));
}

function updatingUserCounters(key, value) {
    switch (key) {
        case 'visits':
        case 'bonuses':
            activeUser[key] += value;    
            break;
        case 'books':
            activeUser[key].push(value);
            break
    
    }
    [valuesCardinfo[0], valuesModalinfo[0]].forEach(item => {
        item.innerHTML = activeUser.visits;
    });
    [valuesCardinfo[1], valuesModalinfo[1]].forEach(item => {
        item.innerHTML = activeUser.bonuses;
    });
    [valuesCardinfo[2], valuesModalinfo[2]].forEach(item => {
        item.innerHTML = activeUser.books.length;
    });
    const rentedList = document.querySelector('.rented-books-list');
    rentedList.innerHTML = '';
    activeUser.books.forEach((item) => {
        let rentedBook = document.createElement('li');
        rentedBook.innerHTML = favorites[item.season][item.index].bookTitle + ', ' + favorites[item.season][item.index].autor.slice(3);
        rentedList.append(rentedBook);
    })

    localStorage.setItem(activeUser.email, JSON.stringify(activeUser));
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
    updatingUserCounters();
    buttonCardChecker.classList.add('nodisplay');
    infoCardChecker.classList.remove('nodisplay');
    const avatarModal = document.querySelector('.avatar-modal');
    const nameModal = document.querySelector('.avatar-name-modal');
    const cardNumberModal = document.querySelector('.card-number-module div');
    avatarModal.innerHTML = data.icon;
    nameModal.innerHTML = data.firstname + ' ' + data.lastname;
    cardNumberModal.innerHTML = data.cardNumber;
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

// activeUser.books = []; updatingUserCounters();