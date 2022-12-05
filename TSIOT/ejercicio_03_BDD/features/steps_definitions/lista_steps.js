const { Given, When, Then, DataTable } = require('@cucumber/cucumber');
const { assert } = require('chai');
const Lista = require('../../src/lista.js');

var lista;

Given('una lista vacía', function() {
    lista = new Lista();
});

Given('una lista con los siguientes elementos', function(elementos) {

    lista = new Lista();
    elementos.rawTable.forEach(pareja => {
        lista.add(pareja[0], pareja[1]);
    });
});

When('se agrega la pareja {}', function(pareja) {
    const array = Object.entries(JSON.parse(pareja));
    lista.add(array[0][0], array[0][1])
});

When('se actualiza la pareja {}', function(pareja) {
    const array = Object.entries(JSON.parse(pareja));
    resultado = lista.update(array[0][0], array[0][1])
});

When('se elimina la clave {}', function(clave) {
    resultado = lista.delete(clave)
});

When('se agregan los elementos', function(elementos) {
    elementos.rawTable.forEach(pareja => {
        lista.add(pareja[0], pareja[1]);
    });
});

When('se agrega la clave {string} con el valor {}', function(clave, valor) {
    lista.add(clave, valor)
});

When('se busca la clave {string}', function(clave) {
    resultado = lista.find(clave);
});

Then('la lista tiene {int} elemento(s) almacenado(s)', function(cantidad) {
    assert.equal(cantidad, lista.count());
});

Then('se obtiene el valor {}', function(valor) {
    assert.equal(valor, resultado.valor);
});

Then('no se encuentra el elemento {}', function(clave) {
    resultado = lista.find(clave);
    assert.isFalse(resultado);
});

Then(/^la actualización es (exitosa|errónea)/, function(element) {
    if (element == 'exitosa') {
        assert.isTrue(resultado);
    } else {
        assert.isFalse(resultado);
    }
});

Then(/^la eliminación es (exitosa|errónea)/, function(element) {
    if (element == 'exitosa') {
        assert.isTrue(resultado);
    } else {
        assert.isFalse(resultado);
    }
});