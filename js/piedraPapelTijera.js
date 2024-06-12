// Declaro las opciones en un array: 
const OPCION = ['piedra', 'papel', 'tijera'];

// Almacenar datos del jugador y el score: 
class TableroJuego {
    constructor() {
        this.puntajeJugador = 0;
        this.puntajePC = 0;
        this.rondas = 0;
        this.jugador = {
            nombre: '',
            edad: 0,
            partidosJugados: 0,
            rondasJugadas: 0,
            rondasGanadas: []
        };
    }

    // Elección de la PC:
    obtenerEleccionPC = () => {
        const RESPUESTAPC = Math.floor(Math.random() * OPCION.length);
        return OPCION[RESPUESTAPC];
    }

    // Elección del jugador y score de cada ronda:
    jugarRonda = (respuestaJugador, RESPUESTAPC, callback) => {
        let resultado;
        if (respuestaJugador === RESPUESTAPC) {
            resultado = 'Empate';
        } else {
            switch (respuestaJugador) {
                case 'piedra':
                    resultado = (RESPUESTAPC === 'tijera') ? 'Ganar' : 'Perder';
                    break;
                case 'papel':
                    resultado = (RESPUESTAPC === 'piedra') ? 'Ganar' : 'Perder';
                    break;
                case 'tijera':
                    resultado = (RESPUESTAPC === 'papel') ? 'Ganar' : 'Perder';
                    break;
                default:
                    resultado = 'Tienes que elegir entre las opciones disponibles';
            }
        }

        if (typeof callback === 'function') {
            callback(resultado, respuestaJugador, RESPUESTAPC);
        }

        return resultado;
    }

    // Actualizar el tablero:
    actualizarResultado = (resultado, indiceRonda) => {
        switch (resultado) {
            case 'Ganar':
                this.puntajeJugador++;
                this.jugador.rondasGanadas.push(indiceRonda);
                break;
            case 'Perder':
                this.puntajePC++;
                break;
        }
    }

    // Mostrar la fecha en el DOM:
    mostrarFecha = () => {
        const FECHA = new Date();
        const fechaElemento = document.getElementById('fecha');
        fechaElemento.innerText = FECHA.toDateString();
    }

    // Pedir el nombre y la edad del jugador (debe ser mayor a 16 años): 
    solicitarDatosJugador = () => {
        this.jugador.nombre = prompt('Ingresa tu nombre:');
        this.jugador.edad = Number(prompt('Ingresa tu edad:'));

        if (this.jugador.edad < 16) {
            alert('Debes tener más de 16 años para jugar');
            return false;
        }

        return true;
    }

    // Juego: 
    jugar = () => {
        if (!this.solicitarDatosJugador()) {
            return;
        }

        this.puntajeJugador = 0;
        this.puntajePC = 0;
        this.jugador.partidosJugados++;
        this.jugador.rondasGanadas = [];

        // Pido cuántas rondas quiere jugar: 
        this.rondas = Number(prompt('¿Cuántas rondas quieres jugar?'));
        this.jugador.rondasJugadas += this.rondas;

        // Pido la respuesta del jugador:
        for (let i = 0; i < this.rondas; i++) {
            let respuestaJugador = prompt('¿Piedra, papel o tijera?').toLowerCase();

            while (!OPCION.includes(respuestaJugador)) {
                respuestaJugador = prompt('Elige entre las opciones mencionadas: piedra, papel o tijera').toLowerCase();
            }

            const RESPUESTAPC = this.obtenerEleccionPC();
            alert(`La PC eligió ${RESPUESTAPC}`);

            let resultado = this.jugarRonda(respuestaJugador, RESPUESTAPC, (resultado, respuestaJugador, RESPUESTAPC) => {
                alert(resultado === 'Empate' ? 'Eligieron lo mismo, empate' : resultado === 'Ganar' ? '¡Zarpado, quién te conoce Cortana!' : 'Perdiste');
                alert(`Jugador: ${respuestaJugador}, PC: ${RESPUESTAPC}`);
            });

            this.actualizarResultado(resultado, i + 1);
            alert(`Puntaje = Jugador: ${this.puntajeJugador}, PC: ${this.puntajePC}`);
        }

        if (this.puntajeJugador > this.puntajePC) {
            alert('¡Excelente! Si Siri estuviese acá, te cantaría una serenata');
        } else if (this.puntajeJugador === this.puntajePC) {
            alert('Deportivo Empate');
        } else {
            alert('Óptimus Prime te aplastó');
        }

        // Muestro una estrella por cada ronda ganada: 
        const contenedorEstrellas = document.getElementById('estrellas');
        if (contenedorEstrellas) {
            contenedorEstrellas.innerHTML = '';
            this.jugador.rondasGanadas.forEach(() => {
                const estrella = document.createElement('span');
                estrella.innerText = '⭐';
                contenedorEstrellas.appendChild(estrella);
            });
        } else {
            console.error("Elemento con id 'estrellas' no encontrado en el DOM");
        }

        if (confirm('¿Jugamos otra?')) {
            this.jugar();
        } else {
            alert('Gracias por jugar');
        }
    }
}

const juego = new TableroJuego();
juego.mostrarFecha();
juego.jugar();
