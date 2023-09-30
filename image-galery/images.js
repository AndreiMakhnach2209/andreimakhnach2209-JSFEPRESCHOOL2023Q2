
const startUrl = 'https://api.unsplash.com/photos/random?count=30&client_id=zcuWiNOuGDVa8bs4Jc9a05tF2Sud4KmlPlD3PtyRueg';
const gallery = document.querySelector('.main');
const searchInput = document.querySelector('.searching-box');

async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    if (data.results) {
        galleryFilling(data.results);
    }else{
        galleryFilling(data);
    };
    const images = document.querySelectorAll('.image');
    console.log(images);
    if (!images.length) {
        alert('Images not found');
        getData(startUrl);
    }
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

let queryUrl = (query) => {
    return `https://api.unsplash.com/search/photos?query=${query}&per_page=30&client_id=zcuWiNOuGDVa8bs4Jc9a05tF2Sud4KmlPlD3PtyRueg`
}

let deleteImageElement = () => {
    const images = document.querySelectorAll('.image');
    console.log(images);

    images.forEach(element => {
        element.remove();
    });
}

searchInput.addEventListener('submit', (event) => {
    event.preventDefault();
    deleteImageElement();
    getData(queryUrl(event.target[0].value));
})
