const tracks = [
    `Beyonce<>Don't Hurt Yourself<>./assets/audio/beyonce.mp3<>./assets/img/lemonade.png`,
    `Dua Lipa<>Don't Start Now<>./assets/audio/assets_audio_dontstartnow.mp3<>./assets/img/dontstartnow.png`
];

const trackList = {
    autor: [],
    title: [],
    url: [],
    urlImage:[]
}

const buttonPlay = document.querySelectorAll('.button')[0];

tracks.forEach((item, index) => {
    trackList.autor[index] = item.split('<>')[0];
    trackList.title[index] = item.split('<>')[1];
    trackList.url[index] = item.split('<>')[2];
    trackList.urlImage[index] = item.split('<>')[3];
})

let audioElements = [];

function addAudio(indexTrack) {
    audioElements[indexTrack] = document.createElement('audio');
    audioElements[indexTrack].src = trackList.url[indexTrack];
}

for (let i = 0; i < tracks.length; i++) {
    addAudio(i);    
}

function playingTrack(indexTrack) {
    audioElements[indexTrack].play();
    buttonPlay.classList.remove('play');
    buttonPlay.classList.add('pause');
}

function pausingTrack(indexTrack) {
    audioElements[indexTrack].pause();
    buttonPlay.classList.add ('play');
    buttonPlay.classList.remove ('pause');
}

buttonPlay.addEventListener('click', () => {
playingTrack(0)
})