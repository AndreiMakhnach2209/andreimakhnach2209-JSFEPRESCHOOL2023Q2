const burgerMenu = document.querySelector('.burger-menu');
const background = document.querySelector('.background-click');
const burgerIcons = document.querySelectorAll('.burger-icon');
const navItems = document.querySelectorAll('.nav-item');

function openingBurger() {
    closingDrop();
    burgerMenu.classList.add('burger-open');
    background.classList.remove('hidden');
}

function closingBurger() {
    burgerMenu.classList.remove('burger-open');
    background.classList.add('hidden');
}

navItems.forEach(i => {    
    i.addEventListener('click', closingBurger);
});

burgerIcons[0].addEventListener('click', openingBurger);
burgerIcons[1].addEventListener('click', closingBurger);
background.addEventListener('click', closingBurger);