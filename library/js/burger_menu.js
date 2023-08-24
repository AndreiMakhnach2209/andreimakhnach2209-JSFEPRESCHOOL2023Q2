
const burgerMenu = document.querySelector('.burger-menu');
const background = document.querySelector('.background-click');
const burgerIcon = document.querySelectorAll('.burger-icon');
const navItems = document.querySelectorAll('.nav-item');

background.addEventListener('click', toggleBurger);
navItems.forEach(i => {    
    i.addEventListener('click', toggleBurger)
});

burgerIcon[0].addEventListener('click', toggleBurger);
burgerIcon[1].addEventListener('click', toggleBurger);

function toggleBurger() {
    burgerMenu.classList.toggle('opened');
    background.classList.toggle('hidden');
}
