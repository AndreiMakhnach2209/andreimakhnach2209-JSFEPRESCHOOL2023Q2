const dropMenu = document.querySelector('.drop-menu');
const profileIcons = document.querySelectorAll('.profile-icon');
const dropButtons = document.querySelectorAll('.drop-button');
const modalContainer = document.querySelector('.modal-container');
const modalRegister = document.querySelectorAll('.modal-menu')[0];
const modalLogin = document.querySelectorAll('.modal-menu')[1];
const modalCloseButtons = document.querySelectorAll('.modal-close-button');
const modalFooterButtons = document.querySelectorAll('.modal-footer button');


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
}

profileIcons[0].addEventListener('click', () => {
    if (dropMenu.classList.contains('drop-open')) 
        closingDrop()
    else {
        closingModal();
        openingDrop();
    };
});

profileIcons[1].addEventListener('click', () => {
    closingBurger();
    openingDrop();
});


dropButtons[0].addEventListener('click', () => {
    closingBurger();
    closingDrop();
    openingModal(modalLogin);
});

dropButtons[1].addEventListener('click', () => {
    closingBurger();
    closingDrop();
    openingModal(modalRegister);
});

modalCloseButtons.forEach(i => i.addEventListener('click', closingModal));

modalFooterButtons[0].addEventListener('click', () => {
    modalRegister.classList.add('nodisplay');
    openingModal(modalLogin);
})

modalFooterButtons[1].addEventListener('click', () => {
    modalLogin.classList.add('nodisplay');
    openingModal(modalRegister);
})

console.log(modalFooterButtons);
background.addEventListener('click', (event) => {
    if (!modalContainer.contains(event.target)) {
        closingDrop();
        closingModal();
        closingBurger();
    }
});