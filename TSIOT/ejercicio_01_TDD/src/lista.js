module.exports = class Lista {

    cantidad
    elementos

    constructor() {
        this.cantidad = 0;
        this.elementos = [];
    }

    count() {
        return this.cantidad;
    }

    add(clave, valor) {
        if (typeof(clave) != 'string' || clave == "") {
            return false;
        }
        var existe = this.find(clave);
        if (!existe) {
            this.elementos.push({ 'clave': clave, 'valor': valor });
            this.cantidad++;
        }
        return false;
    }

    find(clave) {
        for (var indice = 0; indice < this.elementos.length; indice++) {
            if (this.elementos[indice].clave == clave) {
                return { 'indice': indice, 'valor': this.elementos[indice].valor };
            }
        }

        return false;
    }

    update(clave, valor) {
        var resultado = this.find(clave);

        if (resultado) {
            this.elementos[resultado.indice].valor = valor;
            return true;
        } else {
            return false;
        }
    }

    delete(clave) {
        var resultado = this.find(clave);

        if (resultado) {
            var indiceDelete = resultado.indice;

            if (indiceDelete >= 0) {
                this.elementos.splice(indiceDelete, 1);
                this.cantidad--;
                return true;
            }
        }

        return false;
    }
}