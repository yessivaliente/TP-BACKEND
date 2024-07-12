let carrito = [];

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    mostrarCarrito();
}

function mostrarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';

    carrito.forEach(producto => {
        const elemento = document.createElement('li');
        elemento.textContent = `${producto.nombre} - ${producto.precio}`;
        listaCarrito.appendChild(elemento);
    });

    calcularTotal();
}

function calcularTotal() {
    const totalCarrito = document.getElementById('total-carrito');
    const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
    totalCarrito.textContent = `$${total}`;
}


// Función para limpiar el carrito
function limpiarCarrito() {
    carrito = []; // Establece el carrito como un array vacío
    console.log("El carrito ha sido limpiado.");
}

// Llamar a la función limpiarCarrito cuando el usuario decida no comprar
document.getElementById("botonCancelarCompra").addEventListener("click", function() {
    limpiarCarrito();
});

// Cargar el reproductor de YouTube API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var player;
var playPauseBtn = document.getElementById("playPauseBtn");
var seekBar = document.getElementById("seekBar");


function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '315',
        width: '560',
        videoId: 'EjSDy5wP2oE', 
        playerVars: {
            'playsinline': 1 
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}


function onPlayerReady(event) {

    playPauseBtn.addEventListener("click", togglePlayPause);
    seekBar.addEventListener("input", seekVideo);
}


function onPlayerStateChange(event) {
    
    if (event.data == YT.PlayerState.PAUSED) {
        playPauseBtn.textContent = "Play";
    }
}


function togglePlayPause() {
    if (player.getPlayerState() == YT.PlayerState.PLAYING) {
        player.pauseVideo();
        playPauseBtn.textContent = "Play";
    } else {
        player.playVideo();
        playPauseBtn.textContent = "Pause";
    }
}


function seekVideo() {
    var value = seekBar.value;
    var duration = player.getDuration();
    var time = (value / 100) * duration;
    player.seekTo(time);
}
