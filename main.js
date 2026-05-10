const modelViewer = document.querySelector('#visor-ar');
const musicaLira = new Audio('assets/lira_music.mp3'); 
musicaLira.loop = true

const modelos = {
    'venus_1': {
        src: 'assets/venus_1.glb',
        alt: 'Venus de Capua en estado original',
        poster: 'assets/poster-venus_1.webp'
    },
        'venus_2': {
        src: 'assets/venus_2.glb',
        alt: 'Venus de Capua restaurada',
        poster: 'assets/poster-venus_2.webp'
    },
        'venus_3': {
        src: 'assets/venus_3.glb',
        alt: 'Venus de Capua y la Manzana de la Discordia',
        poster: 'assets/poster-venus_3.webp'
    },
        'venus_4': {
        src: 'assets/venus_4.glb',
        alt: 'Venus de Capua (Afrodita), diosa del amor y su relación simbólica con Marte (Ares), dios de la guerra. Amor y Guerra',
        poster: 'assets/poster-venus_4.webp'
    },
        'venus_5': {
        src: 'assets/venus_5.glb',
        alt: 'Venus de Capua y vínculo con el arte, la música y la belleza',
        poster: 'assets/poster-venus_5.webp'
    },
};

window.switchModel = (element, name) => {
    const modelo = modelos[name];

    modelViewer.src = modelo.src;
    modelViewer.alt = modelo.alt;
    modelViewer.poster = modelo.poster;

    const slides = document.querySelectorAll(".slide");
    slides.forEach((el) => el.classList.remove("selected"));
    element.classList.add("selected");

    //-- audio
    if (name == 'venus_5'){
        musicaLira.play().catch(error => {
            console.warn("reproduccion bloqueada");
        });       
    } else {
        musicaLira.pause();
        musicaLira.currentTime = 0; // reiniciar
    }
};

function switchScreen(screen) {
    let showViewer = screen == 'model-viewer' ? 'block' : 'none';
    modelViewer.style.display = showViewer;

    if (!modelViewer.canActivateAR) {
        console.warn("este dispositivo no es apto para realidad aumentada");
    }
}