const carouselButtonsArea = document.querySelectorAll('.carousel-button-link');
const carouselButtons = document.querySelectorAll('.carousel-button');
const carouselImages = document.querySelectorAll('.carousel-item');
const carousel = document.querySelector('.carousel-box');
const container = document.querySelector('.container');
let indexActiveButton = 0;

function paging(event) {
    const target = event.target;
    if (target != carouselButtons[indexActiveButton]) imagesPaging();
    buttonsPaging(target);
} 

function buttonsPaging(target) {
    carouselButtons.forEach((item, index) => {
        if (item === target) 
            indexActiveButton = (indexActiveButton < index) ? indexActiveButton + 1
                            : (indexActiveButton > index) ? indexActiveButton - 1
                            : indexActiveButton
        item.classList.remove('active');
    });
    carouselButtons[indexActiveButton].classList.add('active');
}

function imagesPaging (){
    carousel.classList.add('opacity');
    carousel.addEventListener('transitionend', () => {
        displayingImages();
        carousel.classList.remove('opacity')
    });
}

function displayingImages() {
    let a = (container.clientWidth <= 1024) ? 0 : 2;
    indexActiveButton = (container.clientWidth > 1024 && indexActiveButton > 2) ? 2 : indexActiveButton;
    carouselImages.forEach((item, index) => {
        item.classList.add('nodisplay');
        if (indexActiveButton  <= index && index <= indexActiveButton + a) {
            item.classList.remove('nodisplay');
        }
    });
}

function buttonActivation(elements) {
    elements.forEach((item, index) => {
        if (!item.matches('active')) {
            item.addEventListener('click', paging);
        }else{
            item.removeEventListener('click', paging);
            indexActiveButton = index;
        }
    });
}

displayingImages();
window.addEventListener('resize', () => {
    displayingImages();
    buttonsPaging();
});
buttonActivation(carouselButtons);