
const startUrl = 'https://api.unsplash.com/photos/random?count=30&client_id=zcuWiNOuGDVa8bs4Jc9a05tF2Sud4KmlPlD3PtyRueg';
const gallery = document.querySelector('.main');
const searchInput = document.querySelector('.searching-box');
const background = document.querySelector('.background');

async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    if (data.results) {
        galleryFilling(data.results);
    }else{
        galleryFilling(data);
    };
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
        alert('Images not found');
        getData(startUrl);
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
    getData(queryUrl(event.target[0].value));
})

getData(startUrl);

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