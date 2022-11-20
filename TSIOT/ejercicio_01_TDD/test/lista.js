const assert = require("chai").assert;
const Lista = require("../src/lista.js");

/**
 * 1. En una lista vacia hay cero elementos almacenados x
 * 2. En una lista vacia, agrego un elemento y hay 1 elemento almacenado x
 * 3. En lista vacia agrego dos elementos y hay 2 elementos almacenados x
 * 4. En lista con elementos si trato de insertar una clave duplicada da error 
 *      y la cantidad de elementos no cambia x
 * 5. Duplicar la primera, la ultima y alguna del medio.
 * 6. Tratar de insertar elementos con claves que no sean cadenas y verificar que las rechaza x
 * 7. Probar tambien con claves vacias. x
 * 8. Cargar una clave con un valor conocido, consultar el valor asociado a la clave y ver en que coinciden. x
 * 9. Probar con mas de tres claves y buscando la primera, la ultima y alguna intermedia. x
 * 10. Buscar una clave que no existe y comprobar el error. x
 * 11. Armar una lista de mas de tres parejas, actualizar los valores de la primera, 
 *      la ultima y una al medio, consultar el valor despues de la actualización y ver que es correcto. x
 * 12. Tratar de actualizar un valor que no existe, retorna que la operación no se ejecutó. x
 * 13. En una lista con parejas, borro una clave y al buscarla no existe. x
 * 14. En una lista con parejas borro una clave que no existe y tengo un error. x
 * 15. En lista vacía, borro una clave y tengo un error. x
 */

describe("en una lista vacia", function() {
    var lista = new Lista();

    it("hay cero elementos", function() {
        assert.equal(lista.count(), 0);
    });

    // describe("cuando se agrega una clave que no es una cadena", function() {

    //     var resultado = lista.add(1, 1);

    //     it("", function() {

    //     });

    // });
});

describe("cuando se agrega un elemento a una lista vacia", function() {
    var lista = new Lista();

    lista.add("clave", "valor");

    it("hay un elemento", function() {
        assert.equal(lista.count(), 1);
    });

    it("se encuentra el elemento agregado", function() {
        assert.isNotNull(lista.find("clave"));
    });

    it("el valor del elemento agregado coincide", function() {
        assert.equal("valor", lista.find("clave").valor);
    });
});

describe("cuando se agregan dos elementos a una lista vacia", function() {
    var lista = new Lista();

    lista.add("uno", "1");
    lista.add("dos", "2");

    it("hay dos elemento", function() {
        assert.equal(lista.count(), 2);
    });

    it("se encuentra el elemento 1", function() {
        assert.isNotNull(lista.find("uno"));
    });

    it("se encuentra el elemento 2", function() {
        assert.isNotNull(lista.find("dos"));
    });
});

describe("al intentar agregar una clave duplicada", function() {
    var lista = new Lista();
    lista.add("uno", 10);

    it("no cambia la cantidad de elementos almacenados", function() {
        var resultado = lista.count();
        lista.add("uno", 10);

        assert.equal(resultado, lista.count());
    });
});

describe("cuando se agregan claves que no son string", function() {
    var lista = new Lista();
    var resultado = lista.add(1, 1);

    it("retorna un error", function() {
        assert.isFalse(resultado);
    });
    assert.equal(lista.count(), 0);
});

describe("cuando se agregan claves vacias", function() {
    var lista = new Lista();
    var resultado = lista.add("", 1);

    it("retorna un error", function() {
        assert.isFalse(resultado);
    });
    assert.equal(lista.count(), 0);
});

describe("cuando se busca una clave inexistente", function() {
    var lista = new Lista();

    it("retorna false como resultado de la operación", function() {
        assert.isFalse(lista.find("a"));
    });
});

describe("cuando se actualiza un elemento que no existe", function() {

    var lista = new Lista();

    it("retorna false como resultado de la operación", function() {
        assert.isFalse(lista.update("nuevo", "valor"));
    });

    it("la cantidad de elementos no varía", function() {
        assert.equal(0, lista.count());
    });
});

describe("cuando se actualiza un elemento que existe", function() {

    var lista = new Lista();
    lista.add("uno", "1");

    it("retorna true como resultado de la operación", function() {
        assert.isTrue(lista.update("uno", "1"));
    });

    it("la cantidad de elementos no varía", function() {
        assert.equal(1, lista.count());
    });
});

describe("cuando se elimina un elemento de una lista vacía", function() {

    var lista = new Lista();

    it("retorna false como resultado de la operación", function() {
        assert.isFalse(lista.delete("uno"));
    });

    it("la cantidad de elementos no varía", function() {
        assert.equal(0, lista.count());
    });
});

describe("cuando se elimina un elemento que no existe", function() {

    var lista = new Lista();
    lista.add("clave", "valor");

    it("retorna false como resultado de la operación", function() {
        assert.isFalse(lista.delete("uno"));
    });

    it("la cantidad de elementos no varía", function() {
        assert.equal(1, lista.count());
    });
});

describe("cuando se elimina un elemento que existe", function() {

    var lista = new Lista();
    lista.add("uno", "1");
    var resultadoCount = lista.count();

    it("retorna true como resultado de la operación", function() {
        assert.isTrue(lista.delete("uno"));
    });

    it("la cantidad de elementos decrece", function() {
        assert.equal(resultadoCount - 1, lista.count());
    });
});

describe("cuando se agregan 4 elementos a la lista", function() {

    var lista = new Lista();
    lista.add("uno", "1");
    lista.add("dos", "2");
    lista.add("tres", "3");
    lista.add("cuatro", "4");
    var resultadoCount = lista.count();

    it("se encuentra el primer elemento", function() {
        assert.equal("1", lista.find("uno").valor);
    });

    it("se encuentra el tercer elemento", function() {
        assert.equal("3", lista.find("tres").valor);
    });

    it("se encuentra el ultimo elemento", function() {
        assert.equal("4", lista.find("cuatro").valor);
    });

    it("la cantidad de elementos es 4", function() {
        assert.equal(4, lista.count());
    });
});

describe("cuando se actualizan 3 elementos a una lista", function() {

    var lista = new Lista();
    lista.add("uno", "1");
    lista.add("dos", "2");
    lista.add("tres", "3");
    lista.add("cuatro", "4");
    var resultadoCount = lista.count();

    it("se verifica el primer elemento actualizado", function() {
        assert.isTrue(lista.update("uno", "uno"));
        assert.equal("uno", lista.find("uno").valor);
    });

    it("se verifica el segundo elemento actualizado", function() {
        assert.isTrue(lista.update("dos", "dos"));
        assert.equal("dos", lista.find("dos").valor);
    });

    it("se verifica el tercer elemento actualizado", function() {
        assert.isTrue(lista.update("tres", "tres"));
        assert.equal("tres", lista.find("tres").valor);
    });

    it("la cantidad de elementos es 4", function() {
        assert.equal(4, lista.count());
    });
});