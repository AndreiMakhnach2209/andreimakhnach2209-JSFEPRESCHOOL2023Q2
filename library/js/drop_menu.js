const dropMenu = document.querySelector('.drop-menu');
const profileIcons = document.querySelectorAll('.profile-icon');
const dropButtons = document.querySelectorAll('.drop-button');

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

dropButtons.forEach(i => {
    i.addEventListener('click', closingDrop);
})

background.addEventListener('click', closingDrop);