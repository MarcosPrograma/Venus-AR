const modelViewer = document.querySelector('#visor-ar');

const modelos = {
    'efebo': {
        src: 'assets/venus_1.glb',
        alt: 'Venus de Capua en estado original',
        //poster: 'assets/poster-efebo.webp'
    },
};

function switchScreen(screen) {
    let showViewer = screen == 'model-viewer' ? 'block' : 'none';
    modelViewer.style.display = showViewer;

    if (!modelViewer.canActivateAR) {
        console.warn("este dispositivo no es apto para realidad aumentada");
    }
}