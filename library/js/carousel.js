const carouselButtonsArea = document.querySelectorAll('.carousel-button-link');
const carouselButtons = document.querySelectorAll('.carousel-button');
const carouselImages = document.querySelectorAll('.carousel-item');
const carousel = document.querySelector('.carousel-box');
const container = document.querySelector('.container');
const arrows = document.querySelectorAll('.carousel-arrow-link');
let indexActiveButton = 0;

function paging(event) {
    buttonsPaging(event.currentTarget);
    imagesPaging();
} 

function buttonsPaging(target) {
    carouselButtonsArea.forEach((item, index) => {
        if (item === target) 
            indexActiveButton = (indexActiveButton < index) ? indexActiveButton + 1
                            : (indexActiveButton > index) ? indexActiveButton - 1
                            : indexActiveButton
    });
    carouselButtons.forEach(item => {
        item.classList.remove('active');
    })
    carouselButtons[indexActiveButton].classList.add('active');
    arrowActivation(indexActiveButton);
}

function imagesPaging (){
    indexActiveButton = (container.clientWidth > 1024 && indexActiveButton > 2) ? 2 : indexActiveButton;
    displayingImages();
}

function displayingImages() {
    let imageWidth = (container.clientWidth > 1024) ? carouselImages[indexActiveButton].clientWidth + 25 : carouselImages[indexActiveButton].clientWidth;
    carousel.style.right = imageWidth * indexActiveButton + 'px';
}

function buttonActivation() {
    carouselButtons.forEach((item, index) => {
        if (!item.matches('active')) {
            carouselButtonsArea[index].addEventListener('click', paging);
        }else{
            carouselButtonsArea[index].removeEventListener('click', paging);
            indexActiveButton = index;
        }
    });
}

function arrowPaging (event) {
    indexActiveButton = (event.currentTarget === arrows[0] && indexActiveButton > 0) ? indexActiveButton - 1 : indexActiveButton;
    indexActiveButton = (event.currentTarget === arrows[1] && indexActiveButton < 4) ? indexActiveButton + 1 : indexActiveButton;
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
    imagesPaging();
    buttonsPaging();
});
buttonActivation();
arrowActivation(indexActiveButton);