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

let mitosData = {};
let idActual = 'venus_1';

async function cargarMitosData() {
    try {
        const response = await fetch('data/mitos.json');
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        mitosData = await response.json();
        actualizarInfoPanel(idActual);
    } catch (error) {
        console.error("Error al cargar la información:", error);
    }
}

function actualizarInfoPanel(id) {
    const mito = mitosData[id];
    if (!mito) {
        console.warn(`No se encontraron datos en mitos.json: "${id}"`);
        return;
    }

    const tituloEl = document.getElementById("panel-titulo");
    const metaEl = document.getElementById("panel-meta");
    const contenidoContenedor = document.getElementById("panel-contenido");

    if (tituloEl) tituloEl.textContent = mito.titulo;

    if (contenidoContenedor && Array.isArray(mito.descripcion)) {
        contenidoContenedor.innerHTML = mito.descripcion
            .map(parrafo => `<p>${parrafo}</p>`)
            .join('');
    }
}

window.switchModel = (element, id) => {
    idActual = id;
    const modelo = modelos[id];

    if(modelo && modelViewer){
        modelViewer.src = modelo.src;
        modelViewer.alt = modelo.alt;
        modelViewer.poster = modelo.poster;
    }

    const slides = document.querySelectorAll(".slide");
    slides.forEach((el) => el.classList.remove("selected"));
    element.classList.add("selected");

    actualizarInfoPanel(id);

    //audio
    if (id == 'venus_5'){
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

document.addEventListener("DOMContentLoaded", () => {
    cargarMitosData();

    const infoPanel = document.getElementById("info-panel");
    const infoOverlay = document.getElementById("info-overlay");
    const infoBtn = document.getElementById("info-button");
    const closeBtn = document.getElementById("close-panel");

    function openPanel() {
        actualizarInfoPanel(idActual);
        if (infoPanel) infoPanel.classList.add("visible");
        if (infoOverlay) infoOverlay.classList.add("visible");
    }

    function closePanel() {
        if (infoPanel) infoPanel.classList.remove("visible");
        if (infoOverlay) infoOverlay.classList.remove("visible");
    }

    if (infoBtn) infoBtn.addEventListener("click", openPanel);
    if (closeBtn) closeBtn.addEventListener("click", closePanel);
    if (infoOverlay) infoOverlay.addEventListener("click", closePanel);
});