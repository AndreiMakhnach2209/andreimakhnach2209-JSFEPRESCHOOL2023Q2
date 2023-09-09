const dropMenu = document.querySelector('.drop-menu');
const profileIcons = document.querySelectorAll('.profile-icon');
const dropButtons = document.querySelectorAll('.drop-button');
const modalContainer = document.querySelector('.modal-container');
const modalRegister = document.querySelectorAll('.modal-menu')[0];
const modalLogin = document.querySelectorAll('.modal-menu')[1];
const modalCloseButtons = document.querySelectorAll('.modal-close-button');
const modalFooterButtons = document.querySelectorAll('.modal-footer button');
const accountButtonsCard = document.querySelectorAll('.login-btn-row button');
const userIcons = document.querySelectorAll('.user-icon')
const buttonsBuy = document.querySelectorAll('.button-buy');
const dropTitle = document.querySelector('.drop-title');

function openingDrop() {
    closingBurger();
    dropMenu.classList.add('drop-open');
    background.classList.remove('hidden');
}

function closingDrop() {
    dropMenu.classList.remove('drop-open');
    background.classList.add('hidden');
}

function openingModal(modalMenu) {
    modalMenu.classList.remove('nodisplay');
    background.classList.add('shade');
    background.classList.remove('hidden');
    modalContainer.classList.remove('opacity');
}

function closingModal() {
    modalContainer.addEventListener('transitionend', () => {
        modalRegister.classList.add('nodisplay');
        modalLogin.classList.add('nodisplay');
    }, {once: true});
    background.classList.remove('shade');
    modalContainer.classList.add('opacity');
    background.classList.add('hidden');
    for (form of document.forms) {
        form.reset();
    }
}

[profileIcons[0], userIcons[0]].forEach(item => {
    item.addEventListener('click', () => {
        if (dropMenu.classList.contains('drop-open')) 
            closingDrop()
        else {
            closingModal();
            openingDrop();
        };
    });
});

[profileIcons[1], userIcons[1]].forEach(item => {
    item.addEventListener('click', () => {
        closingBurger();
        openingDrop();
    });
});

function openingLoginForm() {
    closingBurger();
    closingDrop();
    openingModal(modalLogin);
}

[dropButtons[0], ...buttonsBuy, accountButtonsCard[1]].forEach(item => {
    item.addEventListener('click', openingLoginForm)
});

[dropButtons[1], accountButtonsCard[0]].forEach(item => {
    item.addEventListener('click', () => {
        closingBurger();
        closingDrop();
        openingModal(modalRegister);
    });
})
modalCloseButtons.forEach(i => i.addEventListener('click', closingModal));

modalFooterButtons[0].addEventListener('click', () => {
    modalRegister.classList.add('nodisplay');
    openingModal(modalLogin);
})

modalFooterButtons[1].addEventListener('click', () => {
    modalLogin.classList.add('nodisplay');
    openingModal(modalRegister);
})

background.addEventListener('click', (event) => {
    if (!modalContainer.contains(event.target)) {
        closingDrop();
        closingModal();
        closingBurger();
    }
});
