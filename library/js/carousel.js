const carouselButtonsArea = document.querySelectorAll('.carousel-button-link');
const carouselButtons = document.querySelectorAll('.carousel-button');
const carouselimages = document.querySelectorAll('.carousel-item');
let indexActiveButton = 0;

function paging(event) {
    const target = event.target;
    carouselButtons.forEach((item, index) =>{
        if (item === target) 
            indexActiveButton = (indexActiveButton < index) ? indexActiveButton + 1
                              : (indexActiveButton > index) ? indexActiveButton - 1
                              : indexActiveButton
        item.classList.remove('active');
    })
    carouselButtons[indexActiveButton].classList.add('active');
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