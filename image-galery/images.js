
const startUrl = 'https://api.unsplash.com/photos/random?orientation=landscape&count=30&client_id=zcuWiNOuGDVa8bs4Jc9a05tF2Sud4KmlPlD3PtyRueg';
const gallery = document.querySelector('.main');

async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    galleryFilling(data);
}

getData(startUrl);

let createImageElement = (urlImage) => {
    const image = document.createElement('img');
    image.src = urlImage;
    image.alt = 'image';
    image.classList.add('image');
    gallery.append(image);
}

let galleryFilling = (array) => {
    array.forEach(element => {
        createImageElement(element.urls.regular);
    });
}