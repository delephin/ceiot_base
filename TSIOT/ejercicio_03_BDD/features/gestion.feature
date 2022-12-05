# language: es
# encoding: utf-8

# 1. En una lista vacia hay cero elementos almacenados x
# 2. En una lista vacia, agrego un elemento y hay 1 elemento almacenado x
# 3. En lista vacia agrego dos elementos y hay 2 elementos almacenados x
# 4. En lista con elementos si trato de insertar una clave duplicada da error y la cantidad de elementos no cambia x
# 5. Duplicar la primera, la ultima y alguna del medio. x
# 6. Tratar de insertar elementos con claves que no sean cadenas y verificar que las rechaza ----
# 7. Probar tambien con claves vacias. x
# 8. Cargar una clave con un valor conocido, consultar el valor asociado a la clave y ver en que coinciden. x
# 9. Probar con mas de tres claves y buscando la primera, la ultima y alguna intermedia. x
# 10. Buscar una clave que no existe y comprobar el error. x
# 11. Armar una lista de mas de tres parejas, actualizar los valores de la primera,  la ultima y una al medio, 
#     consultar el valor despues de la actualización y ver que es correcto. 
# 12. Tratar de actualizar un valor que no existe, retorna que la operación no se ejecutó. x
# 13. En una lista con parejas, borro una clave y al buscarla no existe. x
# 14. En una lista con parejas borro una clave que no existe y tengo un error. x
# 15. En lista vacía, borro una clave y tengo un error. x

Característica: Gestionar las parejas almacenadas en la lista

Escenario: Una lista vacia tiene cero elementos
    Dada una lista vacía
    Entonces la lista tiene 0 elemento almacenado

Escenario: Agregar un elemento a una lista vacia
    Dada una lista vacía
    Cuando se agrega la pareja { "clave": "valor" }
    Entonces la lista tiene 1 elemento almacenado

Escenario: Agregar un elemento a una lista con elementos
    Dada una lista con los siguientes elementos 
    | uno | 1 |
    Cuando se agrega la pareja {"dos": 2}
    Entonces la lista tiene 2 elementos almacenados

Escenario: Agregar un elemento con clave duplicada
    Dada una lista con los siguientes elementos 
    | uno | 1 |
    Cuando se agrega la pareja {"uno": 2}
    Entonces la lista tiene 1 elementos almacenados

Esquema del escenario: Lista con varios elementos
    Dada una lista con los siguientes elementos 
    | uno | 1 | 
    | dos | 2 | 
    | tres | 3 |
    | cuatro | 4 |
    | cinco | 5 |
    Cuando se agregan los elementos
    | uno | 1 | 
    | dos | 3 | 
    | tres | 5 |    
    Entonces la lista tiene 5 elementos almacenados

Escenario: Agregar un elemento con clave vacia
    Dada una lista con los siguientes elementos 
    | uno | 1 |
    Cuando se agrega la pareja { "": 2}
    Entonces la lista tiene 1 elementos almacenados

Escenario: Consulta el valor guardado
    Dada una lista con los siguientes elementos 
    | uno | 1 |
    Cuando se busca la clave "uno"
    Entonces se obtiene el valor 1

Esquema del escenario: Busqueda en lista con varios elementos
    Dada una lista con los siguientes elementos 
    | uno | 1 | 
    | dos | 2 | 
    | tres | 3 |
    | cuatro | 4 |
    | cinco | 5 |
    Cuando se busca la clave "dos"
    Entonces se obtiene el valor 2

Escenario: Busqueda por clave inexistente
    Dada una lista con los siguientes elementos 
    | uno | 1 |
    Cuando se busca la clave "dos"
    Entonces no se encuentra el elemento "dos"

Esquema del escenario: Update de valor en lista con elementos
    Dada una lista con los siguientes elementos 
    | tres | 3 |
    | cuatro | 4 |
    | cinco | 5 |
    Cuando se actualiza la pareja { "tres": 33 }
    Entonces la actualización es exitosa

Esquema del escenario: Update de valor en lista con elementos
    Dada una lista con los siguientes elementos 
    | tres | 3 |
    | cuatro | 4 |
    | cinco | 5 |
    Cuando se actualiza la pareja { "uno": 1 }
    Entonces la actualización es errónea

Escenario: Eliminar un elemento existente de una lista 
    Dada una lista con los siguientes elementos 
    | uno | 1 | 
    | dos | 2 | 
    | tres | 3 |
    Cuando se elimina la clave uno
    Entonces la eliminación es exitosa
    Y no se encuentra el elemento uno

Escenario: Eliminar un elemento inexistente de una lista 
    Dada una lista con los siguientes elementos 
    | uno | 1 | 
    | dos | 2 | 
    | tres | 3 |
    Cuando se elimina la clave cuatro
    Entonces la eliminación es errónea
    Y no se encuentra el elemento cuatro

Escenario: Una lista vacia tiene cero elementos
    Dada una lista vacía
    Cuando se elimina la clave dos
    Entonces la eliminación es errónea
    Y no se encuentra el elemento dos