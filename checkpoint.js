// ----- IMPORTANTE -----

// IMPORTANTE!: Para este checkpoint se les brindarán las 
// implementaciones ya realizadas en las homeworks de 
// Queue, LinkedList y BinarySearchTree.
// Sobre dichas implementaciónes van a tener que agregar nuevos
// métodos o construir determinadas funciones explicados más abajo.
// Pero todos los métodos ya implementados en las homeowrks no es 
// necesario que los vuelvan a definir.

const {
    Queue,
    LinkedList,
    Node,
    BinarySearchTree
} = require('./DS.js');

// ----- Closures -----

// EJERCICIO 1
// Implementar la funcion 'exponencial' que recibe un parametro entero 'exp'
// y retorna una una funcion, nos referiremos a esta ultima como funcion hija,
// y a 'exponencial' como la funcion padre, la funcion hija debe de recibir 
// un parametro y retornar dicho parametro elevado al parametro 'exp' de 
// la funcion padre original 'exponencial'
// Ejemplo:
// > var sqrt = exponencial(2);
// > sqrt(2);
// < 4
// > sqrt(3);
// < 9
// > sqrt(4);
// < 16

function exponencial(exp) {
    return function (num) {
        return num ** exp;
    }
}

// ----- Recursión -----

// EJERCICIO 2
// Crear la funcion 'direcciones':
// La funcion debe retornar un string de los movimientos Norte(N), Sur(S), Este(E), Oeste(O)
// que se deben realizar, para llegar al destino de un laberinto dado.
//
// Ejemplo: dado el siguiente laberinto:
// let laberintoExample = {         // direccion = ""
//     N: 'pared',
//     S: {                         // direccion = "S"
//         N: 'pared',
//         S: 'pared',
//         E: {                     // direccion = "SE"
//             N: 'destino',        // direccion = "SEN"
//             S: 'pared',
//             E: 'pared',
//             O: 'pared'
//         },
//         O: {                     // direccion = "SO"
//             N: 'pared',
//             S: 'pared',
//             E: 'pared',
//             O: 'pared'
//         }
//     },
//     E: 'pared',
//     O: 'pared'
// }
// El retorno de la funcion 'direcciones' debe ser 'SEN', ya que el destino se encuentra
// haciendo los movimientos SUR->ESTE->NORTE
// Aclaraciones: el segundo parametro que recibe la funcion ('direccion') puede ser pasado vacio (null)

function direcciones(laberinto) {
    if (laberinto === null || laberinto === undefined || typeof laberinto !== 'object') return '';
    let string = '';
    for (key in laberinto) {
        if (typeof laberinto[key] === 'object') {
            return string + key + direcciones(laberinto[key]);
        } else if (laberinto[key] === 'destino') {
            return string + key;
        }
    }
    return string;
}



// EJERCICIO 3
// Crea la funcion 'deepEqualArrays':
// Dado que las comparaciones en javascript aveces son un problema como con el siguiente ejemplo:
// [0,1,2] === [0,1,2] => false // puede probarlo en la consola
// con objetos o arrays identicos surge la necesidad de comparar en 'profundidad' arrays u objetos
// en este caso la funcion solo va a ser pensada para recibir arrays,
// pero estos pueden tener multiples niveles de anidacion, y la funcion deepEqualArrays debe
// comparar cada elemento, sin importar la profundidad en la que este
// Ejemplos: 
// deepEqualArrays([0,1,2], [0,1,2]) => true
// deepEqualArrays([0,1,2], [0,1,2,3]) => false
// deepEqualArrays([0,1,[[0,1,2],1,2]], [0,1,[[0,1,2],1,2]]) => true

function deepEqualArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0;i<arr1.length;i++) {
        if (typeof arr1[i] != typeof arr2[i]) return false;
        if (arr1[i] != arr2[i]) return false;
        if (typeof arr1[i] == 'object') deepEqualArrays(arr1[i],arr2[i]);
    }
    return true;
}



// ----- LinkedList -----

// Deben completar la siguiente implementacion 'OrderedLinkedList'(OLL)
// que es muy similar a las LinkedList vistas en clase solo que 
// los metodos son distintos y deben de estar pensados para conservar la lista
// ordenada de mayor a menor.
// ejemplos:
// head --> 5 --> 3 --> 2 --> null
// head --> 4 --> 3 --> 1 --> null
// head --> 9 --> 3 --> -1 --> null
// Las dos clases principales ya van a estar implementadas a continuacion:
function OrderedLinkedList() {
    this.head = null;
}
// notar que Node esta implementado en el archivo DS

// Y el metodo print que permite visualizar la lista:
OrderedLinkedList.prototype.print = function(){
    let print = 'head'
    let pointer = this.head
    while (pointer) {
        print += ' --> ' + pointer.value
        pointer = pointer.next;
    }
    print += ' --> null'
    return print
}


// EJERCICIO 4
// Crea el metodo 'add' que debe agregar nodos a la OLL de forma que la misma se conserve ordenada:
// Ejemplo:
// > LL.print()
// < 'head --> null'
// > LL.add(1)
// > LL.print()
// < 'head --> 1 --> null'
//    2       c
// > LL.add(5)
// > LL.print()
// < 'head --> 5 --> 1 --> null'
// > LL.add(4)
// > LL.print()
// < 'head --> 5 --> 3 --> 1 --> null'
//               4
//OrderedLinkedList.prototype.add = function(val){
//    if (!this.head) {
//        this.head = new Node(val);
//        return;
//    }
//    let newNode = new Node(val);
//    if (!this.head.next) {             // Si tiene un solo elemento
//        if(this.head.value > val) {    // Si ese unico elemento es mayor al nuevo.
//            this.head.next = newNode;
//            return;
//        } else {                       // Si ese unico elemento es menor al nuevo
//            this.head.next = this.head
//            this.head = newNode;
//            return;
//        }
//    } else {                           // Si tiene más de un elemento.
//        let current = this.head;
//        while (current.next.value > val) { // Recorre hasta que encuentra un next menor a val
//            current = current.next
//            if (!current.next) {           // Si no existe .next, llegó al final de la lista
//                current.next = newNode;
//                return;
//            }  
//        }
//        let aux = current.next;
//        current.next = newNode;
//        current.next.next = aux;
//        return;
//    }
//}

OrderedLinkedList.prototype.add = function (val) {
    let newNode = new Node(val);
    if (!this.head) {                  // Si la lista está vacía, agrega this.head             
        this.head = newNode;
        return;
    }
    if (this.head.value < val) {       // Si head es menor al nuevo, reemplaza 
        this.head.next = this.head;
        this.head = newNode;
        return;
    }
    let current = this.head;           // Si head es mayor al nuevo. 
    while (current.next && current.next.value > val) {  // Mientras exista .next y .next.value sea mayor,
        current = current.next                          // Recorre la lista hasta no cumplir una de las dos condiciones.    
    }
    if (!current.next) {               // Si no existe .next, se llegó al final de la lista,
        current.next = newNode;        // y agrega nuevo nodo.
        return;
    }
    let aux = current.next;            // Existe .next y .next.value es menor que el nuevo.
    current.next = newNode;            // Nuevo reemplaza a .next, que pasa a ser el .next del nuevo.
    current.next.next = aux;
    return;
}

// EJERCICIO 5
// Crea el metodo 'removeHigher' que deve devolver el valor mas alto de la linked list 
// removiendo su nodo corresponidente:
// Ejemplo:
// > LL.print()
// < 'head --> 5 --> 4 --> 1 --> null'
// > LL.removeHigher()
// < 5
// > LL.removeHigher()
// < 4
// > LL.removeHigher()
// < 1
// > LL.removeHigher()
// < null

OrderedLinkedList.prototype.removeHigher = function(){
    if (!this.head) return null;
    let ret = this.head.value
    this.head = this.head.next;
    return ret;
}


// EJERCICIO 6
// Crea el metodo 'removeLower' que deve devolver el valor mas bajo de la linked list 
// removiendo su nodo corresponidente:
// Ejemplo:
// > LL.print()
// < 'head --> 5 --> 4 --> 1 --> null'
// > LL.removeHigher()
// < 1
// > LL.removeHigher()
// < 4
// > LL.removeHigher()
// < 5
// > LL.removeHigher()
// < null

OrderedLinkedList.prototype.removeLower = function(){
    if (!this.head) return null;
    if (!this.head.next) {
        let ret = this.head.value;
        this.head = null;
        return ret;
    }
    let anterior = this.head
    let current = this.head.next
    while (current.next) {
        anterior = current;
        current = current.next;
    }
    let ret = current.value;
    anterior.next = null;
    return ret;

}



// ----- QUEUE -----

// EJERCICIO 7
// Implementar la funcion multiCallbacks:
// la funcion multiCallbacks recibe dos arrays de objetos cuyas propiedades son dos,
// 'cb' que es una funcion, y 'time' que es el tiempo estimado de ejecucion de dicha funcion 
// este ultimo representado con un integer como se muestra acontinuacion:
// let cbsExample = [
//     {cb:function(){}, time: 2},
//     {cb:function(){}, time: 3}
// ]
// De manera que lo que nuestra funcion 'multiCallbacks' debe de ir ejecutando las funciones 
// sin pasarle parametros pero debe ir alternando las funciones de cbs1 y cbs2 
// segun cual de estas se estima que tarde menos, retornando un arreglo de resultados
// de las mismas en el orden que fueron ejecutadas
// Ejemplo:
// > let cbs1 = [
//       {cb:function(){return '1-1'}, time: 2},
//       {cb:function(){return '1-2'}, time: 3}
//   ];
// > let cbs2 = [
//       {cb:function(){return '2-1'}, time: 1},
//       {cb:function(){return '2-2'}, time: 4}
//   ];
// > multiCallbacks(cbs1, cbs2);
// < ["2-1", "1-1", "1-2", "2-2"];

function multiCallbacks(cbs1, cbs2){
    let arr = cbs1.concat(cbs2);
    let retArr = [];
    arr.sort((a,b) => a.time > b.time ? 1 : -1);
    for (let i = 0;i<arr.length;i++) {
        retArr.push(arr[i].cb());
    }
    return retArr;    
}



// ----- BST -----

// EJERCICIO 8
// Implementar el metodo 'toArray' en el prototype del BinarySearchTree
// que devuelva los valores del arbol en una array ordenado
// Ejemplo:
//     32
//    /  \
//   8   64
//  / \
// 5   9
// resultado:[5,8,9,32,64]

BinarySearchTree.prototype.toArray = function() {
    let arr = [];
    if (this.left) arr = arr.concat(this.left.toArray());
    arr.push(this.value);
    if (this.right) arr = arr.concat(this.right.toArray());
    return arr;
}



// ----- Algoritmos -----

// Ejercicio 9
// Implementar la funcion 'primalityTest' que dado un valor numerico entero
// debe de retornar true or false dependiendo de si este es primo o no.
// Puede que este es un algoritmo que ya hayan implementado pero entenderan
// que es un algoritmo que segun la implementacion puede llegar a ser muy costoso
// para numeros demasiado grandes, asi que vamos a implementarlo mediante un metodo
// derivado de Trial Division como el que se muestra aca:
// https://en.wikipedia.org/wiki/Primality_test
// Si bien esta no es la mejor implementacion existente, con que uds puedan 
// informarse sobre algoritmos, leerlos de un pseudocodigo e implemnterlos alcanzara

function primalityTest(n) {
    if(n < 2) return false;
    if ((n > 2) && (n % 2 == 0)) return false;
    for (let i = 2;i<=Math.sqrt(n);i++) {
        if (n % i == 0) return false;
    }
    return true;
}


// EJERCICIO 10
// Implementa el algoritmo conocido como 'quickSort', que dado un arreglo de elemntos
// retorn el mismo ordenado de 'mayor a menor!'
// https://en.wikipedia.org/wiki/Quicksort

//function quickSort(array) {
//    if (array.length<2) return array;
//    let indicePivot = Math.floor(Math.random() * array.length);
//    let pivot = array.splice(indicePivot,1);
//    let mayores = [];
//    let menores = [];
//    array.forEach(x => x > pivot[0] ? mayores.push(x) : menores.push(x))
//    return [...quickSort(mayores),...pivot,...quickSort(menores)]
//}
//// QuickSort ya lo conocen solo que este 
// ordena de mayor a menor
// para esto hay que unir como right+mid+left o cambiar el 
// signo menor en la comparacion con el pivot

function quickSort(array) {
    // Implementar el método conocido como quickSort para ordenar de menor a mayor
    // el array recibido como parámetro
    // Devolver el array ordenado resultante
    // Tu código:
    if (array.length < 2) return array;
    let indice = Math.floor(Math.random() * array.length);
    let pivot = array.splice(indice,1);
    let menores = [];
    let mayores = [];
    array.forEach(x => x > pivot[0] ? mayores.push(x) : menores.push(x))
    return quickSort(mayores).concat(pivot.concat(quickSort(menores)));
  }




// ----- EXTRA CREDIT -----

// EJERCICIO 11
// Implementa la función 'reverse', que recibe un numero entero como parametro
// e invierte el mismo.
// Pero Debería hacer esto sin convertir el número introducido en una cadena, o un array
// Ejemplo:
// > reverse(123);
// < 321
// > reverse(95823);
// < 32859

function reverse(num){
    let nuevoNum = 0;
    while (num>0) {
        nuevoNum = nuevoNum * 10 + num % 10;
        num = Math.floor(num / 10)
    }
    return nuevoNum;
}
// la grandiosa resolucion de Wilson!!!
// declaran una variable donde 
// almacenar el el numero invertido
// y van multiplicando por 10 la 
// porcion del numero que ya invirtieron
// deforma que esta se corra hacia la izq
// para agregar el ultimo numero de la 
// porcion no revertida
// y luego le quitan a la porcion 
// no revertida el ultimo numero

module.exports = {
    exponencial,
    direcciones,
    deepEqualArrays,
    OrderedLinkedList,
    multiCallbacks,
    primalityTest,
    quickSort,
    reverse,
    Queue,
    LinkedList,
    Node,
    BinarySearchTree
}