const NUMERO_MENOR = 1;
const NUMERO_MAYOR = 12;
const RONDAS = 3;
let continuar = true;

// Genera un número aleatorio entre NUMERO_MENOR y NUMERO_MAYOR:
const generarNumeroAleatorio = () => Math.floor(Math.random() * (NUMERO_MAYOR - NUMERO_MENOR + 1)) + NUMERO_MENOR;

// Pide la elección del usuario (mayor o menor):
const pedirEleccion = () => {
    let eleccionUsuario = prompt('¿Mayor o menor?').toLowerCase();

    // Valida la elección del usuario:
    while (eleccionUsuario !== 'mayor' && eleccionUsuario !== 'menor') {
        eleccionUsuario = prompt('Ingrese una opción válida - mayor o menor').toLowerCase();
    }

    return eleccionUsuario;
};

// Juega una ronda:
const jugarRonda = () => {
    let numeroActual = generarNumeroAleatorio();
    alert(`Número actual: ${numeroActual}`);

    let eleccionUsuario = pedirEleccion();

    let siguienteNumero = generarNumeroAleatorio();
    alert(`Siguiente número: ${siguienteNumero}`);

    let resultado;
    if (siguienteNumero > numeroActual) {
        resultado = 'mayor';
    } else if (siguienteNumero < numeroActual) {
        resultado = 'menor';
    } else {
        resultado = 'igual';
    }

    return { resultado, eleccionUsuario };
};

// Muestra el resultado de la ronda:
const mostrarResultado = (resultado, eleccionUsuario) => {
    if (resultado === eleccionUsuario) {
        alert('¡Excelente! Le pegaste.');
        return { resultadoRonda: 'Victoria', ganada: true };
    } else if (resultado === 'igual') {
        alert('Eran el mismo número. Empate.');
        return { resultadoRonda: 'Empate', ganada: false };
    } else {
        alert('No le atinaste. Sigue participando.');
        return { resultadoRonda: 'Perdida', ganada: false };
    }
};

// Muestra estrellas por cada ronda ganada:
const mostrarEstrellas = (rondasGanadas) => {
    const contenedorEstrellas = document.getElementById('estrellas');
    contenedorEstrellas.innerHTML = '';

    for (let i = 0; i < rondasGanadas; i++) {
        const estrella = document.createElement('span');
        estrella.innerText = '⭐';
        contenedorEstrellas.appendChild(estrella);
    }
};

// Pregunta al usuario si desea jugar otra vez:
const preguntarOtraVez = () => confirm('¿Quieres jugar otra vez?');

// Juega el juego completo:
const jugarJuego = () => {
    while (continuar) {
        let rachasGanadas = 0;
        let rachasPerdidas = 0;
        let resultadoRondas = [];
        let rondasGanadas = 0;

        for (let i = 1; i <= RONDAS; i++) {
            let { resultado, eleccionUsuario } = jugarRonda();

            let { resultadoRonda, ganada } = mostrarResultado(resultado, eleccionUsuario);
            resultadoRondas.push(resultadoRonda);

            if (ganada) {
                rachasPerdidas = 0;
                rachasGanadas++;
                rondasGanadas++;
            } else if (resultadoRonda === 'Perdida') {
                rachasGanadas = 0;
                rachasPerdidas++;
            }
        }

        alert(`Resultados de las rondas: ${resultadoRondas.join(', ')}`);
        alert(`Rondas ganadas: ${rondasGanadas}, Rondas perdidas: ${RONDAS - rondasGanadas}`);
        alert(`Mejor racha ganadora: ${rachasGanadas}, Peor racha perdedora: ${rachasPerdidas}`);

        // Mostrar estrellas por ronda ganada:
        mostrarEstrellas(rondasGanadas);

        // Preguntar si quiere jugar otra vez:
        continuar = preguntarOtraVez();
        if (!continuar) {
            alert('Bye bye');
        }
    }
};

// Iniciar el juego al cargar la página:
jugarJuego();
