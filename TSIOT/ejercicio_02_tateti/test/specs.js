let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);

/**
 * En un juego nuevo el tablero está vacío y le toca mover al primer jugador x
 * Al marcar una casilla el primer jugador, el tablero tiene una casilla ocupada y le toca mover al segundo jugador x
 * Al marcar una casilla el segundo jugador, el tablero tiene dos casillas ocupadas y le toca mover al primer jugador x
 * No debería aceptar un movimiento de un jugador al que no le toca el turno
 * Si un jugador quiere marcar una casilla ocupada entonces tiene un error x
 * Si tres columnas tienen la marca de un mismo jugador entonces ese jugador gana la partida x
 * Si tres filas tienen la marca de un mismo jugador entonces ese jugador gana la partida x
 * Si una de las dos diagonales tienen la marca de un mismo jugador entonces este jugador gana la partida x
 * Si no hay mas lugares vacios en el tablero es un empate x
 */
describe("Juego de TaTeTi", function() {

    let juego = {
        "jugadores": ["Juan", "Pedro"]
    }

    let movimientosTatetiVertical = [
        { jugador: 'Juan', columna: 0, fila: 0 },
        { jugador: 'Pedro', columna: 1, fila: 0 },
        { jugador: 'Juan', columna: 0, fila: 1 },
        { jugador: 'Pedro', columna: 1, fila: 1 },
        { jugador: 'Juan', columna: 0, fila: 2 },
        { jugador: 'Juan', columna: 2, fila: 2 },
        { jugador: 'Pedro', columna: 2, fila: 2 }
    ]

    let movimientosTatetiHorizontal = [
        { jugador: 'Juan', columna: 0, fila: 0 },
        { jugador: 'Pedro', columna: 0, fila: 1 },
        { jugador: 'Juan', columna: 1, fila: 0 },
        { jugador: 'Pedro', columna: 1, fila: 1 },
        { jugador: 'Juan', columna: 2, fila: 0 },
        { jugador: 'Juan', columna: 2, fila: 2 },
        { jugador: 'Pedro', columna: 2, fila: 2 }
    ]

    let movimientosTatetiDiagonal1 = [
        { jugador: 'Juan', columna: 0, fila: 0 },
        { jugador: 'Pedro', columna: 0, fila: 1 },
        { jugador: 'Juan', columna: 1, fila: 1 },
        { jugador: 'Pedro', columna: 1, fila: 0 },
        { jugador: 'Juan', columna: 2, fila: 2 },
        { jugador: 'Juan', columna: 2, fila: 2 }
    ]

    let movimientosTatetiDiagonal2 = [
        { jugador: 'Juan', columna: 0, fila: 0 },
        { jugador: 'Pedro', columna: 2, fila: 0 },
        { jugador: 'Juan', columna: 0, fila: 1 },
        { jugador: 'Pedro', columna: 0, fila: 2 },
        { jugador: 'Juan', columna: 1, fila: 0 },
        { jugador: 'Pedro', columna: 1, fila: 1 }
    ]

    let movimientosEmpate = [
        { jugador: 'Juan', columna: 0, fila: 0 },
        { jugador: 'Pedro', columna: 1, fila: 0 },
        { jugador: 'Juan', columna: 0, fila: 1 },
        { jugador: 'Pedro', columna: 0, fila: 2 },
        { jugador: 'Juan', columna: 1, fila: 1 },
        { jugador: 'Pedro', columna: 2, fila: 1 },
        { jugador: 'Juan', columna: 2, fila: 0 },
        { jugador: 'Pedro', columna: 2, fila: 2 },
        { jugador: 'Juan', columna: 1, fila: 2 }
    ]

    it("Todos los casilleros estan vacios", (done) => {
        chai.request(server)
            .put("/empezar")
            .send(juego)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.to.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('turno').eql('Juan');
                res.body.should.have.property('estado').eql([
                    [" ", " ", " "],
                    [" ", " ", " "],
                    [" ", " ", " "]
                ])
            });
        done();
    });

    describe("El primer jugador hace su primer movimiento", function() {
        it("El casillero queda ocupado y le toca al otro jugador", (done) => {
            chai.request(server)
                .put("/empezar")
                .send(juego)
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiVertical[0])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('turno').eql('Pedro');
                    res.body.should.have.property('estado').eql([
                        ["x", " ", " "],
                        [" ", " ", " "],
                        [" ", " ", " "]
                    ]);
                });
            done();
        });
    });

    describe("El primer jugador hace su segundo movimiento", function() {
        it("El movimiento no es permitido", (done) => {
            chai.request(server)
                .put("/empezar")
                .send(juego)
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiVertical[0])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send({ jugador: 'Juan', columna: 0, fila: 1 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('turno').eql('Pedro');
                    res.body.should.have.property('error').eql('Turno de otro jugador');
                    res.body.should.have.property('estado').eql([
                        ["x", " ", " "],
                        [" ", " ", " "],
                        [" ", " ", " "]
                    ]);
                });
            done();
        });
    });

    describe("El segundo jugador hace su primer movimiento", function() {
        it("El casillero queda ocupado y le toca al otro jugador", (done) => {
            chai.request(server)
                .put("/empezar")
                .send(juego)
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiVertical[0])
                .end();

            chai.request(server)
                .put("/movimiento")
                .send(movimientosTatetiVertical[1])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('turno').eql('Juan');
                    res.body.should.have.property('estado').eql([
                        ['x', 'o', ' '],
                        [' ', ' ', ' '],
                        [' ', ' ', ' ']
                    ]);
                });
            done();
        });
    });

    describe("El primer jugador trata de mover a una posición ocupada", function() {
        it("Se devuelve un error pero el jugador no pierde el turno", (done) => {
            chai.request(server)
                .put("/empezar")
                .send(juego)
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiVertical[0])
                .end();
            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiVertical[1])
                .end();
            chai.request(server)
                .put("/movimiento")
                .send({ jugador: 'Juan', columna: 1, fila: 0 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('turno').eql('Juan');
                    res.body.should.have.property('error').eql('Posición ocupada');
                    res.body.should.have.property('estado').eql([
                        ['x', 'o', ' '],
                        [' ', ' ', ' '],
                        [' ', ' ', ' ']
                    ]);
                });
            done();
        });
    });

    describe("El primer jugador gana la partida", function() {
        it("El juego termina con una columna con tres valores iguales", (done) => {
            chai.request(server)
                .put("/empezar")
                .send(juego)
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiVertical[0])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiVertical[1])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiVertical[2])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiVertical[3])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiVertical[4])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('ganador').eql('Juan');
                    res.body.should.have.property('estado').eql([
                        ['x', 'o', ' '],
                        ['x', 'o', ' '],
                        ['x', ' ', ' ']
                    ]);
                });
            done();
        });
    });

    describe("El primer jugador gana la partida", function() {
        it("El juego termina con una fila con tres valores iguales", (done) => {
            chai.request(server)
                .put("/empezar")
                .send(juego)
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiHorizontal[0])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiHorizontal[1])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiHorizontal[2])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiHorizontal[3])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiHorizontal[4])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('ganador').eql('Juan');
                    res.body.should.have.property('estado').eql([
                        ['x', 'x', 'x'],
                        ['o', 'o', ' '],
                        [' ', ' ', ' ']
                    ]);
                });
            done();
        });
    });
    describe("El primer jugador gana la partida", function() {
        it("El juego termina con una diagonal con tres valores iguales", (done) => {
            chai.request(server)
                .put("/empezar")
                .send(juego)
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiDiagonal1[0])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiDiagonal1[1])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiDiagonal1[2])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiDiagonal1[3])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiDiagonal1[4])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('ganador').eql('Juan');
                    res.body.should.have.property('estado').eql([
                        ['x', 'o', ' '],
                        ['o', 'x', ' '],
                        [' ', ' ', 'x']
                    ]);
                });
            done();
        });
    });

    describe("El primer jugador gana la partida", function() {
        it("El juego termina con una diagonal invertida con tres valores iguales", (done) => {
            chai.request(server)
                .put("/empezar")
                .send(juego)
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiDiagonal2[0])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiDiagonal2[1])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiDiagonal2[2])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiDiagonal2[3])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiDiagonal2[4])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosTatetiDiagonal2[5])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('ganador').eql('Pedro');
                    res.body.should.have.property('estado').eql([
                        ['x', 'x', 'o'],
                        ['x', 'o', ' '],
                        ['o', ' ', ' ']
                    ]);
                });
            done();
        });
    });

    describe("Se realizan todos los movimientos posibles", function() {
        it("El juego termina con en empate", (done) => {
            chai.request(server)
                .put("/empezar")
                .send(juego)
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosEmpate[0])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosEmpate[1])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosEmpate[2])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosEmpate[3])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosEmpate[4])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosEmpate[5])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosEmpate[6])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosEmpate[7])
                .end();

            chai.request(server)
                .put('/movimiento')
                .send(movimientosEmpate[8])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('ganador').eql('empate');
                    res.body.should.have.property('estado').eql([
                        ['x', 'o', 'x'],
                        ['x', 'x', 'o'],
                        ['o', 'x', 'o']
                    ]);
                });
            done();
        });
    });
});