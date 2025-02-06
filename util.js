const message = document.querySelector('.container-message')
const container = document.querySelector('.container')

console.log(message, container)


function checkOrientation() {
    if (window.innerWidth > window.innerHeight) {
        message.style.display = 'none';
        container.style.display = 'flex';
        console.log('horizontal')
    } else {
        console.log('vertical')
        message.style.display = 'block';
        container.style.display = 'none';
    }
}

window.addEventListener('resize', () => {
    checkOrientation();
});

window.addEventListener('load', () => {
    checkOrientation();
});

const fullscreenButton = document.getElementById('fullscreenButton');

function openFullscreen() {
    console.log('ko')
    const elem = document.getElementById('container');
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

fullscreenButton.addEventListener('click', openFullscreen);