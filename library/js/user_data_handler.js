if (localStorage.getItem('activeUser')) {
    activeUser = JSON.parse(localStorage[localStorage.activeUser]);
    userActivation(activeUser);
}



