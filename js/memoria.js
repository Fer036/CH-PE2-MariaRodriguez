const COLORES = ['amarillo', 'azul', 'rojo', 'verde', 'naranja', 'negro'];
const RONDAS = 3;

// Esta será la seuencia pra adivinar: 
class Adivinanza {
    constructor(palabra, numero, color) {
        this.palabra = palabra;
        this.numero = numero;
        this.color = color;
    }
}

// TYablero del juego:
class TableroJuego {
    constructor() {
        this.puntajeJugador = 0;
        this.puntajePC = 0;
        this.rondas = RONDAS;
        this.jugador = {
            nombre: '',
            edad: 0,
            partidosJugados: 0,
            rondasJugadas: 0,
            rondasGanadas: []
        };

        this.resultadosGlobales = {
            partidosGanados: 0,
            partidosPerdidos: 0
        };

        // Con esta función el usuario solo ingresa una vez sus datos hasta re cargar la pagina:
        const jugadorGuardado = localStorage.getItem('jugador');
        if (jugadorGuardado) {
            this.jugador = JSON.parse(jugadorGuardado);
        }
    }

    // Obtener el numero yu el color aleatorio:
    obtenerNumAleatorio() {
        return Math.floor(Math.random() * 100) + 1;
    }

    obtenerColorAleatorio() {
        let indiceColor = Math.floor(Math.random() * COLORES.length);
        return COLORES[indiceColor];
    }

    // Creo la secuencia: 
    crearAdivinanza(palabra) {
        let numero = this.obtenerNumAleatorio();
        let color = this.obtenerColorAleatorio();
        return new Adivinanza(palabra, numero, color);
    }
    // Solicito los datos:
    solicitarDatosJugador() {
        if (!this.jugador.nombre || !this.jugador.edad) {
            this.jugador.nombre = prompt('Ingresa tu nombre:');
            this.jugador.edad = Number(prompt('Ingresa tu edad:'));

            if (this.jugador.edad < 16) {
                alert('Debes tener más de 16 años para jugar');
                return false;
            }

            // Guardo los datos para que dsp se puedan acceder: 
            localStorage.setItem('jugador', JSON.stringify(this.jugador));
        }

        return true;
    }

    // Muestro fecha en el DOM
    mostrarFecha() {
        const fecha = new Date();
        document.getElementById('fecha').innerText = fecha.toDateString();
    }

    // Juego por ronda:
    jugarRonda(indiceRonda) {
        let palabra = prompt('Ingresa una palabra');
        let adivinanza = this.crearAdivinanza(palabra);

        alert(`Memoriza esta secuencia: Palabra: ${adivinanza.palabra}, Color: ${adivinanza.color}, Número: ${adivinanza.numero}`);

        const propiedades = ['palabra', 'color', 'numero'];
        // Solicito solo una propiedad de la secuencia:
        const propiedadSolicitada = propiedades.filter(p => p !== 'palabra')[Math.floor(Math.random() * 2)];
        let respuesta;

        switch (propiedadSolicitada) {
            case 'color':
                respuesta = prompt('Ingresa el color: ');
                break;
            case 'numero':
                respuesta = prompt('Ingresa el número: ');
                break;
        }

        let resultado;
        if (respuesta == adivinanza[propiedadSolicitada]) {
            resultado = 'Ganar';
            this.puntajeJugador++;
            this.jugador.rondasGanadas.push(indiceRonda);
        } else {
            resultado = 'Perder';
            this.puntajePC++;
        }

        return resultado;
    }
    // acutualizo el tablero: 
    actualizarScore(resultado) {
        if (resultado === 'Ganar') {
            this.puntajeJugador++;
        } else if (resultado === 'Perder') {
            this.puntajePC++;
        }
    }
    // Muestro los resultados:
    mostrarScore() {
        const contenedorEstrellas = document.getElementById('estrellas');
        contenedorEstrellas.innerHTML = '';
        for (let i = 0; i < this.resultadosGlobales.partidosGanados; i++) {
            const estrella = document.createElement('span');
            estrella.innerText = '⭐';
            contenedorEstrellas.appendChild(estrella);
        }
        alert(`Hola ${this.jugador.nombre}! Rondas ganadas: ${this.jugador.rondasGanadas.length}, Partidos ganados: ${this.resultadosGlobales.partidosGanados}`);
    }
    // Juego:
    jugar() {
        if (!this.solicitarDatosJugador()) {
            return;
        }

        this.mostrarFecha();

        this.puntajeJugador = 0;
        this.puntajePC = 0;
        this.jugador.partidosJugados++;
        this.jugador.rondasGanadas = [];
        this.jugador.rondasJugadas += this.rondas;

        for (let i = 0; i < this.rondas; i++) {
            const resultado = this.jugarRonda(i + 1);
            this.actualizarScore(resultado);
        }

        if (this.puntajeJugador > this.puntajePC) {
            alert('¡Ganaste el partido!');
            this.resultadosGlobales.partidosGanados++;
        } else if (this.puntajeJugador < this.puntajePC) {
            alert('Perdiste el partido');
            this.resultadosGlobales.partidosPerdidos++;
        } else {
            alert('Empate');
        }

        this.mostrarScore();

        if (confirm('¿Jugamos otra?')) {
            this.jugar();
        } else {
            alert('Gracias por jugar');
        }
    }
}

const juego = new TableroJuego();
juego.jugar();

