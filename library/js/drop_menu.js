const dropMenu = document.querySelector('.drop-menu');
const profileIcons = document.querySelectorAll('.profile-icon');
const dropButtons = document.querySelectorAll('.drop-button');
const modalContainer = document.querySelector('.modal-container');
const modalRegister = document.querySelector('.modal-register');

function openingDrop() {
    closingBurger();
    dropMenu.classList.add('drop-open');
    background.classList.remove('hidden');
}

function closingDrop() {
    dropMenu.classList.remove('drop-open');
    background.classList.add('hidden');
}

profileIcons.forEach(i => {
    i.addEventListener('click', () => {
        if (dropMenu.classList.contains('drop-open')) 
        closingDrop()
        else openingDrop();
    })
});

function openingRegister() {
    modalRegister.classList.remove('nodisplay');
    background.classList.add('shade');
    background.classList.remove('hidden');
    modalContainer.classList.remove('opacity');
    closingDrop();
}

function closingReister() {
    modalContainer.classList.add('opacity');
    background.classList.remove('shade');
    modalRegister.classList.add('nodisplay');
    background.classList.add('hidden');
}

dropButtons.forEach(i => {
    i.addEventListener('click', openingRegister);
})

background.addEventListener('click', () => {
    closingDrop();
    closingReister();
});