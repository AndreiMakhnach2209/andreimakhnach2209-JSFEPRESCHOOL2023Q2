const tracks = [
    `Beyonce<>Don't Hurt Yourself<>./assets/audio/beyonce.mp3<>./assets/img/lemonade.png`,
    `Dua Lipa<>Don't Start Now<>./assets/audio/assets_audio_dontstartnow.mp3<>./assets/img/dontstartnow.png`
];

const trackList = {
    autor: [],
    title: [],
    url: [],
    urlImage: [],
}

const buttonPlay = document.querySelectorAll('.button')[0],
      imageTrack = document.querySelector('.image-track'),
      background = document.querySelector('.body'),
      trackAutor = document.querySelector('.track-autor'),
      trackTitle = document.querySelector('.track-title'),
      trackDuration = document.querySelector('.duration-time'),
      trackCurrentTime = document.querySelector('.current-time'),
      scrollbar = document.querySelector('.scrollbar input')


tracks.forEach((item, index) => {
    trackList.autor[index] = item.split('<>')[0];
    trackList.title[index] = item.split('<>')[1];
    trackList.url[index] = item.split('<>')[2];
    trackList.urlImage[index] = item.split('<>')[3];
})

let audioElements = [],
    checkedTrack = 0;

function addAudio(indexTrack) {
    audioElements[indexTrack] = document.createElement('audio');
    audioElements[indexTrack].src = trackList.url[indexTrack];
    audioElements[indexTrack].preload = 'metadata';
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
    buttonPlay.classList.add ('play');
    buttonPlay.classList.remove ('pause');
    audioElements[indexTrack].pause();
}

buttonPlay.addEventListener('click', () => {
    if (audioElements[checkedTrack].paused) {
        playingTrack(checkedTrack);
    }else{
        pausingTrack(checkedTrack);
    }
    imageTrack.classList.toggle('playing');
})

function timeSecToMin(timeSec) {
    const min = Math.floor(timeSec / 60);
    const sec = Math.floor(timeSec % 60);  
    return sec < 10 ? min + ':0' + sec : min + ':' + sec;
}

function displayingTrackData(indexTrack) {
    background.style.backgroundImage = 'url(' + trackList.urlImage[indexTrack] + ')';
    imageTrack.src = trackList.urlImage[indexTrack];
    trackAutor.innerHTML = trackList.autor[indexTrack];
    trackTitle.innerHTML = trackList.title[indexTrack];
    audioElements[indexTrack].addEventListener('loadedmetadata', () => {
        trackDuration.innerHTML = timeSecToMin(audioElements[indexTrack].duration);
        trackCurrentTime.innerHTML = timeSecToMin(audioElements[indexTrack].currentTime);
        scrollbar.min = 0;
        scrollbar.max = audioElements[indexTrack].duration;
        scrollbar.value = 0;
    })    
}

function updatingScrollbar() {
    scrollbar.value = audioElements[checkedTrack].currentTime;
    trackCurrentTime.innerHTML = timeSecToMin(audioElements[checkedTrack].currentTime);
}

displayingTrackData(checkedTrack);

setInterval(() => updatingScrollbar(), 500);

scrollbar.addEventListener('input', (event) =>{
    audioElements[checkedTrack].currentTime = event.target.value;
})

audioElements[checkedTrack].addEventListener('ended', () => {
    pausingTrack[checkedTrack];
})