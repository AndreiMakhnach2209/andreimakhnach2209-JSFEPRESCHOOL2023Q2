const carouselButtonsArea = document.querySelectorAll('.carousel-button-link');
const carouselButtons = document.querySelectorAll('.carousel-button');
const carouselImages = document.querySelectorAll('.carousel-item');
const carousel = document.querySelector('.carousel-box');
let indexActiveButton = 0;

function paging(event) {
    const target = event.target;
    if (target != carouselButtons[indexActiveButton]) imagesPagig();
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

function imagesPagig (){
    carousel.classList.add('opacity');
    carousel.addEventListener('transitionend', () => {
        carouselImages.forEach((item, index) => {
            item.classList.add('nodisplay');
            if (indexActiveButton  <= index && index <= indexActiveButton +2) {
                item.classList.remove('nodisplay');
            }
        })
        carousel.classList.remove('opacity')
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
    })
}

buttonActivation(carouselButtons);