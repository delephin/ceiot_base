var express = require('express');
const { response } = require('../app');
var router = express.Router();

const marcas = ['x', 'o'];

var jugadores;
var estado;
var turno;
var cantidadMovimientos;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.put('/empezar', function(req, resp) {
    turno = 0;
    cantidadMovimientos = 0;
    jugadores = req.body.jugadores;
    estado = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];
    resp.setHeader('Content-Type', 'application/json');
    resp.send({ turno: jugadores[turno], estado: estado });
});

router.put('/movimiento', function(req, resp) {

    const columna = req.body.columna;
    const fila = req.body.fila;
    const jugador = req.body.jugador;

    const expectedJugador = jugadores[turno];

    if (expectedJugador != jugador) {
        resp.setHeader('Content-Type', 'application/json');
        resp.send({ error: 'Turno de otro jugador', estado: estado, turno: jugadores[turno] });
        return;
    }

    if (estado[fila][columna] == ' ') {
        estado[fila][columna] = marcas[turno];
    } else {
        resp.setHeader('Content-Type', 'application/json');
        resp.send({ error: 'Posición ocupada', estado: estado, turno: jugadores[turno] });
        return;
    }

    cantidadMovimientos += 1;

    var ganador;
    var iguales;

    if (cantidadMovimientos >= 5) {
        // check match columna
        iguales = checkColumna(marcas[turno], columna);

        // check match fila
        if (iguales == false) {
            iguales = checkFila(marcas[turno], fila);
        }

        // check match diagonales
        if (iguales == false) {
            iguales = checkDiagonal(marcas[turno], columna, fila);
        }

        if (iguales) {
            ganador = turno;
        }
    }

    turno = (turno + 1) % 2;

    // console.log('Cantidad De Movimientos %s', cantidadMovimientos);

    resp.setHeader('Content-Type', 'application/json');
    if (isNaN(ganador)) {
        if (cantidadMovimientos == 9) {
            resp.send({ ganador: 'empate', estado: estado });
        } else {
            resp.send({ turno: jugadores[turno], estado: estado });
        }
    } else {
        resp.send({ ganador: jugadores[ganador], estado: estado });
    }
});

function checkColumna(marca, columna) {
    let iguales = true;
    for (var fil = 0; fil < 3; fil++) {
        // console.log('fil %s, columna %s, estado[%s][%s]=%s', columna, fil, fil, columna, estado[fil][columna]);
        iguales = iguales && (estado[fil][columna] == marca);
    }

    return iguales;
}

function checkFila(marca, fila) {
    let iguales = true;
    for (var col = 0; col < 3; col++) {
        // console.log('fila %s, col %s, estado[%s][%s]=%s', col, fila, fila, col, estado[fila][col]);
        iguales = iguales && (estado[fila][col] == marca);
    }

    return iguales;
}

function checkDiagonal(marca, columna, fila) {
    // console.log('CheckDiagonales marca %s', marca);
    let iguales = true;
    if ((columna == 0 && [0, 2].includes(fila)) || (columna == 1 && fila == 1) || (columna == 2 && [0, 2].includes(fila))) {
        var col = 0;
        var fil = 0;
        while (col < 3 && fil < 3) {
            // console.log('fil %s, col %s, estado[%s][%s]=%s', col, fil, fil, col, estado[fil][col]);
            iguales = iguales && (estado[fil][col] == marca);
            col++;
            fil++;
        }
        if (iguales == true) return true;
        iguales = true;
        var col = 2;
        var fil = 0;
        while (col > 0 && fil < 3) {
            // console.log('fil %s, col %s, estado[%s][%s]=%s', col, fil, fil, col, estado[fil][col]);
            iguales = iguales && (estado[fil][col] == marca);
            col--;
            fil++;
        }
        return iguales;
    }
    return false;
}

module.exports = router;