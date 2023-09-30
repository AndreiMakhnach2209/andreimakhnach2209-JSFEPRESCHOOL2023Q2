
const startUrl = 'https://api.unsplash.com/photos/random?count=30&client_id=zcuWiNOuGDVa8bs4Jc9a05tF2Sud4KmlPlD3PtyRueg';
const gallery = document.querySelector('.main');
const searchInput = document.querySelector('.searching-box');
const background = document.querySelector('.background');

async function getData(url) {
    try {
        const res = await fetch(url);        
        const data = await res.json();
        if (data.results) {
            galleryFilling(data.results);
        }else{
            galleryFilling(data);
        };
    } catch {
        createErrorMessage(`Server request error. Try refreshing the page later`);
    }
}

let createImageElement = (urlImage) => {
    const image = document.createElement('img');
    image.src = urlImage;
    image.alt = 'image';
    image.classList.add('image');
    gallery.append(image);
    openingImage(image);
}

let galleryFilling = (array) => {
    if (!array.length) {
        createErrorMessage('Images not found');
    }else{
        array.forEach(element => {
            createImageElement(element.urls.regular);
        });
    }
}

let queryUrl = (query) => {
    return `https://api.unsplash.com/search/photos?query=${query}&per_page=30&client_id=zcuWiNOuGDVa8bs4Jc9a05tF2Sud4KmlPlD3PtyRueg`
}

let deleteImageElement = () => {
    const images = document.querySelectorAll('.image');
    images.forEach(element => {
        element.remove();
    });
}

searchInput.addEventListener('submit', (event) => {
    event.preventDefault();
    deleteImageElement();
    deleteErrorMessage();
    getData(queryUrl(event.target[0].value));
})

let openingImage = (element) => {
        element.addEventListener('click', (event) => {
        const image = event.target;
        image.classList.toggle('full');
        background.classList.toggle('nodisplay');
    })
}

background.addEventListener('click', () => {
    const fullImage = document.querySelector('.full');
    background.classList.add('nodisplay');
    fullImage.classList.remove('full');
})

let createErrorMessage = (err) => {
    const error = document.createElement('div');
    error.textContent = err;
    error.classList.add('error');
    gallery.append(error);
}

let deleteErrorMessage = () => {
    const error = document.querySelector('.error');
    if (error) error.remove();
}

getData(startUrl);