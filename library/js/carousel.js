const carouselButtonsArea = document.querySelectorAll('.carousel-button-link');
const carouselButtons = document.querySelectorAll('.carousel-button');
const carouselImages = document.querySelectorAll('.carousel-item');
const carousel = document.querySelector('.carousel-box');
const container = document.querySelector('.container');
const arrows = document.querySelectorAll('.carousel-arrow-link');
let indexActiveButton = 0;

function paging(event) {
    if (event.target != carouselButtons[indexActiveButton]) imagesPaging();
    buttonsPaging(event.target);    
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
    arrowActivation(indexActiveButton);
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

function arrowPaging (event) {
    indexActiveButton = (event.target === arrows[0] && indexActiveButton > 0) ? indexActiveButton - 1 : indexActiveButton;
    indexActiveButton = (event.target === arrows[1] && indexActiveButton < 4) ? indexActiveButton + 1 : indexActiveButton;
    paging(event);
}

function arrowActivation(index) {
    arrows.forEach(item => {
        item.classList.remove('disable')
        item.addEventListener('click', arrowPaging);
    });
    switch (index) {
        case 0:
            arrows[0].removeEventListener('click', arrowPaging);
            arrows[0].classList.add('disable');
        break;
        case 4:
            arrows[1].removeEventListener('click', arrowPaging);
            arrows[1].classList.add('disable');
        break;

    }
}


displayingImages();
window.addEventListener('resize', () => {
    displayingImages();
    buttonsPaging();
});
buttonActivation(carouselButtons);
arrowActivation(indexActiveButton);