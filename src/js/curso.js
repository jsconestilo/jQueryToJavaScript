// Impimir información por consola
console.log('Curso de JQuery a Javascript Vanilla')
console.warn('Platzi México')

// Declaración de una constante a nivel global
// Las constantes se deben declarar e inicializar al mismo tiempo
// No cambian, si reasignamos un nuevo valor se lanza un error
const cedula = '01515-AHS77M'

// Declaración de variables a nivel global
// Las variables se pueden declarar sin inicializarlas o inicicalizarlas al mismo tiempo
// Cambian durante la ejecución del programa. (Se pueden resignar nuevos valores) 
let nombre = 'Alejandro González Reyes'

// Las funciones agrupan un conjunto de instrucciones para ejecutar una deterinada tarea en particular
// La definicón del cuerpo de una función puede recibir argumentos
// En este caso newName es el argumento de la funcion
// Y cunado se invoca estos arguemenetos son reemplazados por los parametros (valores pasados a la función)
function cambiarNombre(newName) {
	// Sobre-escribir el valor actual de una variable global
	nombre = newName
}

// Probar ejecuntando desde la consola del navegador
// La función clear() limpia la consola del navegador



// Declaración de una promesa
// Las promesas son utiles para manejar nuestro código asincrono (código que en un determinado momento
// puede resolverse correctamente o fallar. Como una petición a una API)
// 
// Las promesas son objetos que representan el exito o fracaso de una operacon asincrona
// 
// Al crear una promesa debemos pasarle como argumento una función, la cual contiene instrucciones que se ejecutaran de manera asincrona
// 
// El primer parametro es una función que se ejecutará si la promesa se resuelve correctamente,
// El segundo parametro es una función que se ejecutara si la promesa falla
const getUser = new Promise(function(resolve, reject) {
	// Simular una llamada a una API via AJAX
	// Este código se ejecuta despues de 3000 milisegundos. No bloquea las instrucciones que están fuera de el.
	setTimeout(function() {
		// Luego de 3 segundos se ejecuta este bloque de código.
		// Simulamos que la promesa se resuleve correctamente invocando la función del primer parametro
		let datos = ['María', 'Demetrio', 'Miguel Angel', 'Alejandro'];
		// Podemos enviar parametros a dicha función para que la  parte solicitante haga algo con ellos.
		// En este caso serían los resultados obtenidos a través de la consulta a la API
		// resolve()
		resolve(datos)
		// 
		// Si la promesa falla debo ejecutar la función del segundo parametro
		// Podemos enviar parametros a dicha función para que la parte solicitante tenga mayor contexto sobre lo que ha pasado
		// reject()
		// reject('Error interno en el servidor')
	}, 3000)
})

// Invocar una promesa
getUser
	.then(function(data) {
		// Esta función se ejecuta si la promesa se resuelve
		// El valor devuelto por la promesa depende internamente de su implementación.
		console.log('Excelente, la promesa se resolvío satisfactoriamente: ' + data)
	})
	.catch(function(error) {
		// Esta función se ejecuta si la promesa falla
		// Es como un decorador para hacer algo a nivel de interfaz como una notificación.
		// El valor devuelto de error, depende de la implementación interna de la promesa (invocacion reject())
		console.error('Lo sentimos, la promesa no se resolvió: ' + error)
	})


// Declaración de promesas adicionales para que posteriormente se ejecuten de forma paralela
// En este caso se simulan operaciones asincronas con tiempo en milisegundos diferentes
const getDias = new Promise((resolve, reject) => {
	setTimeout(() => {
		let dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
		//resolve(dias)
		reject('Error en el servidor de DÍAS')
	}, 5000)
})
const getEstaciones = new Promise((resolve, reject) => {
	setTimeout(() => {
		let estaciones = ['Primavera', 'Verano', 'Otoño', 'Invierno']
		resolve(estaciones)
		// reject('Error en el servidor de ESTACIONES')
	}, 1000)
})


// Ejecutar promesas en paralelo 
// Inspeccionar que todas las promesas se resuelvan para realizar una tarea determinada
// Una analogía sería como una transacción de promesas
Promise.all([getUser, getEstaciones, getDias])
	.then(function(data) {
		// Esta función se ejecuta si y solo si se resuelven todas las promesas
		console.log('Felicidades las promesas se resolvieron correctamente')
		// La data contiene un array con los datos devueltos por cada una de las promesas. Si es que
		// su interfaz interna asi lo decide (que envien datos)
		console.log(data)
	})
	.catch(function(error) {
		// Esta función se ejecuta si alguna de las promesas listadas es rechazada
		console.error('Rayos, alguna de las promesas falló')
		// En este caso el error devuelto corresponde a la promesa que ha fallado
		console.error(error)
	})


// Ejecutar promesas en paralelo por carrera
// inspeccionar que promesa se resuelve primero y realizar una tarea determinada
// 
// Una analogía sería, que todas las promesas se comuniquen a diferentes servidores de replica apuntando al mismo recurso.
// dependiendo de que servidor responda primero, se resolvera su promesa relacionada.
// Ante esto, damos por terminada la ejecución en paralelo
Promise.race([getUser, getEstaciones, getDias])
	.then(data => {
		// Se ejecuta esta función con la data devuelta por la promesa que se resolvío primero
		// Despues de eso. se da por terminado el proceso.
		console.log('Felicidades, alguna de las promesas se ha resulto primero que las demás')
		console.log(data)
	})
	.catch(error => {
		// Esta función se ejecuta si la promesa en atenderse primero falla
		console.error('Lo sentimos, una de las promesas ha fallado')
		console.info(error)
	})


// Realizar peticiones AJAX a una API (recurso) 'XMLHttpRequest'
// Forma jQuery
$.ajax({
	url: 'https://randomuser.me/api/',
	// url: 'https://randomuser.me/api/ruta_no_existente',
	method: 'GET',
	success: function(data) {
		console.log('Promesa resuelta al recurso solicitado de randomuser.me')
		console.log(data)
	},
	error: function(error) {
		console.error('Promesa rechazada, ha fallado al solicitar el relcurso desde randomuser.me')
		console.log(error)
	}
})


// Realizar peticiones FETCH 'traer datos' mediante Javascript vanilla 
// (No es Ajax, es una API implementada en los navegadores modernos para obtener recursos de forma asincrona por la red)
// 
// Al igual que AJAX, se requiere la url y un objeto de configuracion para las cabeceras (metodo de envio, headers, etc)
// Si no se establece ese objeto (segundo parametro), se asume que la peticion es GET 
fetch('https://randomuser.me/api/')
//fetch('https://randomuser.me/api/recurso_no_existente')
	.then(function(response) {
		console.log('Promesa SIN DECORAR resuelta al recurso solicitado de randomuser.me mediante FETCH')
		console.log(response);
		// La promesa devuelta por FETCH es un objeto de respuesta sin decorar, internamente tiene un metodo json( )
		// El cual devuelve otra promesa con los datos decorados en formato JSON (la data)
		// 
		// En este sentido, retornamos la promesa para encadenarla en el siguiente proceso
		return response.json()
	})
	.then(function(data) {
		// Esta es la data devuelta por la promesa del método json( )
		// y contiene los datos debidamente formateados solicitados al servidor (recurso)
		console.log('Felicidades, los datos DECORADOS POR FETCH son')
		console.log(data)
		console.log('Mi usuario', data.results[0].name.first)
	})
	.catch(function(error) {
		// Si la promesa es rechazada, se ejecuta este bloque de código
		// Es importante mencionar que este bloque corresponde a la promesa rechazada del método json( )
		console.log('Lo sentimos, el recurso solicitado por FETCH falló')
		console.log(error)
	})



// Funciones asincronas
// Son como funciones normales, pero internamente se indica que instrucciones se deben esperar a que se resuelvan
// para proceder a ejecutar las instrucciones siguientes
// 
// En un contexto mas real, permiten leer código asincrono como si fuese sincrono
// Importante: 
// await solo funciona si esta declarado dentro de una funcion async
async function load() {
	// Esperar a que se resuelva la petición realizada por fetch.
	// hasta que no se termine de resolver pasa a la siguiente instruccion
	// 
	// El hecho de esperar no justifica que el código se bloqueé... lo que esta fuera de la declaración de la
	// función asincrona se sigue ejecutando
	const response = await fetch('https://swapi.co/api/people/10/')
	// Una vez resuelta la petición anterior, ahora se indica que se debe esperar a que se resuelva esta otra petición
	const data = await response.json()
	// Una vez resuelta la peticicón anterior, se ejecuta esta siguiente línea
	console.log(data)
	// Lo anterior es otra forma de ejecutar el fetch de randomuser.me
}
// Se invoca la función asincrona
load()
// Esta linea de código se ejecuta entes que las peticiónes asincronas
console.log('Código sincrono');




// Este ejemplo contiene tres llamadas a diferentes partes de un recurso API.
// se puede leer como código sincrono gracias a async/await,
// 
// Si bien es posible ejecutarlo con then, catch.
// se tornaría un poco mas complicado de leer
//  
// Ejecución automática (auto-invocacion de funciones)
// ()()
(async function startWars() {
	async function getData(url) {
		const response = await fetch(url)
		const data = await response.json()
		// Retorna un valor que en este caso se conoce hasta que se resuelven las promesas anteriores
		// Por tanto puede ser considerado como una nueva promesa
		return data
	}

	// La llamada a la función getData devuelve una promesa (la data), por tanto hay que esperar a que se resuelva
	const people = await getData('https://swapi.co/api/people/10/')
	const planet = await getData('https://swapi.co/api/planets/3/')
	const startship = await getData('https://swapi.co/api/starships/9/')
	// Si no se espera, la promesa quedará pendiente....sin resolverse
	console.log(people, planet, startship)
})();


// Invocando las tres API mediante then() y catch()
// Mismo ejemplo anterior pero con el enfoque tradicional
const getResource = function(url) {
	return fetch(url).then(function(response) {
		return response.json()
	})
	.then(function(data){
		return data
	})
	.catch(function(error) {
		return error
	});
}
let mypeople, myplanet, mystartship

getResource('https://swapi.co/api/people/1/').then(function(data){
	console.log('mis datos',data)
	mypeople = data;
}).catch(function(error) {
	console.log('Promesa rechazada a https://swapi.co/api/people/10/')
})

getResource('https://swapi.co/api/planets/3/').then(function(data){
	console.log('mas datos', data)
	myplanet = data;
}).catch(function(error) {
	console.log('Promesa rechazada a https://swapi.co/api/planets/3/')
})

getResource('https://swapi.co/api/starships/9/').then(function(data){
	console.log('mas datitos', data)
	mystartship = data;
}).catch(function(error) {
	console.log('Promesa rechazada a https://swapi.co/api/starships/9/')
})

// console.warn(mypeople, myplanet, mystartship)

// La instruccion anterior es imposible, ya que se ejecuta antes que las anteriores y por tanto
// se desconocen aun los datos de estas variables
//
//
//
// Para resolver ese problema, hacerlo mediante transacciones de promesas
Promise.all([
	getResource('https://swapi.co/api/people/1/'), 
	getResource('https://swapi.co/api/planets/3/'),
	getResource('https://swapi.co/api/starships/9/')
]).then(function(data){
	// Ahora si se conoce toda la data, por tanto la imprimimos en consola
	console.info('mis datos en all', data);
}).catch(function(error){
	console.error('error', error)
})


// Almacenado un selector de clase en una variable de javascript  (estilo jqUERY)
// con el fin de manipularlo.
// Por convención, las variables que son elementos del DOM comienzan por un $
const $home = $('.home');

// Retorna un elemento del DOM con id modal
console.log(document.getElementById('modal'))
// Retorna una lista de elementos DOM con la clase modal
console.log(document.getElementsByClassName('modal'))
// Retorna una lista de elementos DOM con el tag div
console.log(document.getElementsByTagName('div'))
// Retornar el primer elemento DOM que coincida con el criterio de búsqueda
console.log(document.querySelector('.myPlaylist-item'))
// Retornar una lista de elementos DOM que coincidan con el criterio de búsqueda
console.log(document.querySelectorAll('.myPlaylist-item'))

// Una buena práctica es almacenar una lista de nodos en una constante
const playlists = document.querySelectorAll('.myPlaylist-item')

// La lista de elementos (nodos) debe recorrerse uno a uno
// para trabajar con cada nodo en particular
/*for(let minodo of playlists) {
	minodo.innerHTML = 'hOLA'
	console.log(minodo)
}*/




// Función asincrona que se encarga de buscar recursos a una API mediante FETCH
async function searchMovies(url) {
	const response = await fetch(url)
	const data = await response.json()
	return data
}
// Función asincrona que se encarga de realizar peticiones a una API
// El código que se debe ejecutar dentro de esta función 
// debe ser en forma secuencial. por tanto se emplea el uso de await 
// y esperar a que se resuelvan las promesas para continuar con la ejecución del código.
async function callAPIMovies() {


	// Esta función se encarga de verificar si el listado de peliculas ya se encuentra en cache del navegador (localstorage)
	// o se tiene que volver hacer FETCH al servidor para recuperar información
	// En este caso recibe como argumento el nombre de la categoria
	async function verificarCache(categoria) {
		// En este caso las variables del storage que almacenaran los lustados de categorias se sufijan con la terminacion List (categoriaList)
		const listName = `${categoria}List`
		// Obtenemos la variable para este tipo de categoria almacenada en el storage del navegador
		const cacheList = localStorage.getItem(listName)
		// Si la variable existe, es porque tiene información
		if (cacheList) {
			// Retornamos su contenido parseado en formato JSON... recordar que localsorage solo almacena texto plano
			return JSON.parse(cacheList)
		} else {
			// En caso de que la variable no exista, se debe volver a consultar a la API del servidor
			const data = await searchMovies(`https://yts.am/api/v2/list_movies.json?genre=${categoria}`)
			// Una vez terminado, seteamos la data devuelta un una variable (con sufijo) a nuestro localstorage del navegador
			// COmo la data es un objeto, lo transformamos a texto plano
			// Esto se hace para guardar los datos de la consulta en cache y si se refresca el navegador, no hay necesidad de volver
			// a hacer FETCH, ya que se cojen estos datos desde el storage
			localStorage.setItem(listName, JSON.stringify(data))
			// Devolvemos la data
			return data
		}
	}

	/* Versión sin hacer uso de verificarCache( )
	const actionList = await searchMovies('https://yts.am/api/v2/list_movies.json?genre=action')
	const dramaList = await searchMovies('https://yts.am/api/v2/list_movies.json?genre=drama')
	const animationList = await searchMovies('https://yts.am/api/v2/list_movies.json?genre=animation')
	*/


	// Estas instrucciones esperan hasta que se resuelva una promesa, la cual consiste en verificar si el listado de peliculas
	// se encuentran almacenados en localstorage del navegador (cache), o se tienen que volver a consultar desde el recurso API externo
	// Para ello se invoca la funcion asincrona verificarCache( ) y como parametro se le pasa el nombre de la categoria a buscar
	const actionList = await verificarCache('action')
	const dramaList = await verificarCache('drama')
	const animationList = await verificarCache('animation')
	console.log(actionList, dramaList, animationList)




	// Guardar datos en el navegador
	// localStorage: 	permite almacenar datos sin tiempo de expiración (solo se peude almacenar texto plano y no objetos....)
	// sessionStorage: 	permite almacenar datos. Estos datos se van a borrar cuando se termine la sessión del navegador
	// 
	// Limpiar/borrar todos los datos 		window.localStorage.clear()
	// Setear un dato 						window.localStorage.setItem('item','value')
	// Obtener un dato 						window.localStorage.getItem('item')
	//
	// Convertir un objeto en texto plano para guardarlo en el storage  ... JSON.strinify( )
	// var object = JSON.stringify({'flor': 'roja'})
	// window.localStorage.setItem('item', object)
	// 
	// Para recuperar los datos del objeto desde el storage 			... JSON.parse( )
	// var object = JSON.parse(window.localStorage.getItem("objeto"));
	

	// Guardar los resultados de consulta a la API en storage del navegador
	// para no tener que volver a solicitaros cuando se refresque.
	// Recordar que estos datos son objetos, por tanto hay que transformarlos en modo texto plano con JSON.stringify( )
	// 
	/* Versión sin hacer uso de verificarCache( ) 
	localStorage.setItem('actionList', JSON.stringify(actionList))
	localStorage.setItem('dramaList', JSON.stringify(dramaList))
	localStorage.setItem('animationList', JSON.stringify(animationList))
	*/



	// Localizamos los elementos del DOM que mas adelante manipularemos para colocar los datos
	// devueltos por la API
	// 
	// Elementos referentes a los contenedores de peliculas
	const $actionContainer = document.getElementById('action')
	const $dramaContainer = document.getElementById('drama')
	const $animationContainer = document.getElementById('animation')

	// Elementos referentes al modal (internos como externos)
	const $modal = document.getElementById('modal')
	const $overlay = document.getElementById('overlay')
	const $hideModal = document.getElementById('hide-modal')

	const $modalTitle = $modal.querySelector('h1')
	const $modalImage = $modal.querySelector('img')
	const $modalDescrition = $modal.querySelector('p')

	// Elementos referentes al contenedor principal, formulario de busqueda y caracteristica del recurso seleccooado
	const $form = document.getElementById('form')
	const $featuringContainer = document.getElementById('featuring')
	const $home = document.getElementById('home')


	// Funcion que retorna un template con sus datos internos debidamente interpoados
	// Cada pelicula encontrada, debe mostrarse con ayuda de esta plantilla
	function videoItemTemplate(movie) {
		// Creación de Templates
		// Son plantillas con contenido base que de forma programatica puede interpolarse
		// con contenido dimámico
		// 
		// Las plantillas por lo general tienen contenido extenso y sus atributo puede estar limitado
		// con comillas simples o dobles.
		// Además, pueden mostrar contenido dinámico que debe concatenarse para lograr el cometido.
		// 
		// En este sentido, ES6 cuenta con los "template literals", que se representan con comillas invertidas ``
		// y pueden interpolar contenido de variables y constantes mediante ${nombre_variable}
		// y son indiferentes a que el contenido interno tenga comillas dobles o simples
		// 
		// El argumento recibido por la función es un objeto movie cuyas propiedades deben inspeccionarse
		// en consola o mediante la documentación de la API
		// 
		// Otro punto importante a destacar en esta sección, son los atributos "data-"" declarados en la firma del elemento
		// Estos atributos permiten pasar información adicional al elemento, informacion que no sera visible en pantalla, pero....
		// que puede recuperarse a través de javascript para darle usos especificos. (pasarla a otros elementos)
		// En este caso, declaramos esta información para cada pelicula, cuando se hace clic en el elemento, esta info se pasa al modal para que se muestre en pantalla 
		return `<div class="primaryPlaylistItem" data-title="${movie.title}" data-description="${movie.synopsis}" data-cover="${movie.medium_cover_image}">
			<div class="primaryPlaylistItem-image">
				<img src="${movie.medium_cover_image}">
			</div>
			<h4 class="primaryPlaylistItem-title">${movie.title}</h4>
		</div>`
	}

	// Esta función se encarga de insertar cada template de pelicula generado
	// dentro de un contenedor especifico dentro del documento HTML
	// Contenedor peliculas de accion .... muchos template que muestran peliculas de accion
	function insertDOMTemplate(HTMLString, $HTMLcontainer) {
		// Insertamos dentro del contenedor, el HTML que representa el template de cada pelicula
		// Se concatena debido a que innerHTML sobreescribe todo el contenido 
		$HTMLcontainer.innerHTML += HTMLString

	}


	// Esta función encapsula código para añadir un manejador de eventos a cada elemento de tipo pelicula
	function addEventClick($container) {
		// Seleccionamos todos los elementos con clase primaryPlaylistItem (peliculas)
		items = $container.getElementsByClassName('primaryPlaylistItem')
		// Recorremos la lista de nodos
		for(let $item of items) {
			// Por cada elemento HTML (pelicula), añadirmos un manejador de eventos de tipo click
			// El segundo parametro es una funcion que se activa para controlar las tareas asociadas a el evento
			// Recibe un objeto de tipo Event que contiene informacipon del evento
			$item.addEventListener('click', function(event) {
				// Creamos un objeto con los datos genericos de la pelicula seleccionada
				// para mostrarlos internamente en el modal.
				// 
				// Cada elemento item en su firma HTML tiene atributos "data" con información propia de la pelicula
				// Para ello hago una consulta a la interfaz DataSet para recuperar sus respectivos valores.
				// En este caso "this" hace referencia al elemento actual (contenedor de pelicula con clase primaryPlaylistItem)
				const info = {
					titulo: this.dataset.title,
					descripcion: this.dataset.description,
					cover: this.dataset.cover
				}
				// La instrucción es ejecutar una función que internamente muestra el modal en pantalla.
				// Recibe un parametro, que es un objeto con los datos genericos de la pelicula a mostrar dentro del modal 
				showModal(info)
			})
		}
	}

	// Esta función se encarga de renderizar las peliculas devueltas por la consulta a una API
	// Para ello recibe un arreglo de peliculas, y el contenedor HTML donde debe de insertarse
	function renderMovieList(listMovies, $HTMLcontainer) {
		// Limpiar el contenido interno que pueda existir dentro del contenedor
		// En este caso, el contenedor HTML contiene un elemento de imagen (loader)
		// Por tanto accedemos a su primer hijo y lo removemos.
		// Otra forma de hacerlo es mediante una consulta de selector.
		// 
		// Importante: Debemos estar seguros de que exista, de lo contrario marcará un error
		// Para ello se puede hacer uso de un condicional
		$HTMLcontainer.children[0].remove()
		// Iterar por cada una de las peliculas
		listMovies.forEach(function(movie) {
			// Invocamos la función que se encarga de interpolar los datos de la pelicula actual
			// dentro de un template de pelicula
			const HTMLString = videoItemTemplate(movie)
			// El template de pelicula devuelto por la función anterior, se inserta dentro del DOM
			// a través de la invoación de la siguiente función
			insertDOMTemplate(HTMLString, $HTMLcontainer)

		})
		const covers = $HTMLcontainer.querySelectorAll('img')
		for(const cover of covers) {
			cover.addEventListener('load', function(event) {
				event.srcElement.classList.add('fadeIn')
			})
		}
		// Función que se encarga de añadir un manejador de eventos
		// a los elementos contenidos en el HTMLContaienr (peliculas)
		addEventClick($HTMLcontainer)
	}

	// Invocar la función que se encargará de renderizar las peliculas devuektas
	// por la consutla a la API.
	// En este caso le enviamos un array de peliculas y el contenedor HTML donde queremos insertarlas
	// 
	// Accedermos como objeto.data.movies ya que la APL devuelve en ese path un arreglo con todas las peliculas encontradas
	renderMovieList(actionList.data.movies, $actionContainer)
	renderMovieList(dramaList.data.movies, $dramaContainer)
	renderMovieList(animationList.data.movies, $animationContainer)


	/* 
	
	Este bloque de código, se ha refactorizado mediante el uso de funciones declaradas
	en la parte inmediata anterior.


	// Recorrer la lista de peliculas de accion y mostrar cada una de ellas mediante el uso del template
	// 
	// actiionList es un objeto, internamente tiene una propiedad data (que a su vez es un objeto),
	// dentro de data hay una propiedad movies que es un array de objetos (cada uno de esos objetos es una pelicula con sus datos)
	actionList.data.movies.forEach(function(movie) {
		// Por cada objeto pelicula dentro de ese arreglo, se invoca a la función videoItemTemplate
		// la cual recibe un paramtro (objeto movie) y retorna el template debidamente interpolado
		const HTMLString = videoItemTemplate(movie)
		console.log(HTMLString)
		// $actionContainer.appenChild(HTMLString) 	Esta línea no funciona ya que appendChild espera nodos no cadenas HTML
		$actionContainer.innerHTML += HTMLString   	// Concatenamos, ya que innerHTML borra todo el contenido interno
		
		// Otra forma de hacerlo es crear un documento HTML básico en memoria
		// Acceder al body del html básico e insertar HTML dentro de el
		// Añadimos como elemento hijo al final, el nodo hijo del documento HTML básico
		// 
		// const docHTML = document.implementation.createHTMLDocument()
		// docHTML.body.innerHTML = HTMLString
		// $actionContainer.appendChild(docHTML.body.children[0])

	})
	
	*/

	// La siguiente instrucción permite hacer un debug de nuestro código. lo detiene donde se le declare
	// para realizar una inspección en ese punto sobre los posibles errores dificiles de encontrar.
	// Para ello se hace uso de la consola, y se verifica el valor actual de las variables, o el
	// contenido de los devueltos por una API
	// 
	// debugger
	


	// Añadir un manejador de eventos de tipo submit al elemento de formulario
	// El segundo parametro es un HANDLER, una función controladora de evento que contiene
	// el código a ejecutar 
	// Esta función recibe un obejo de tipo Event con informacion propia del evento que ha desencadenado
	// dicha funcipon (enn este caso el tipo submit)
	$form.addEventListener('submit', async function(event) {
		// Algunos elementos HTML tienen un comportamiento por defecto en el navegador.
		// En este caso cuando se envia el formulario, por defecto se refresca la página o se redirige a otro lugar
		// Para prevenirlo se emplea...
		event.preventDefault()
		$home.classList.add('search-active')

		// Crear un elemento Nodo de HTML
		const $loader = document.createElement('img')
		// Invocar una función que permite setear multiples atributos
		// a un determinando elemento de nodo HTML
		setAttributes($loader, {
			src: 'src/images/loader.gif',
			width: 50,
			heigth: 50
		})
		// Añadir la imagen en la sección de feature
		// append( ) agrega el elemento al final de su padre (igual que appendChild)
		// Acepta n cantidad de elementos a insertar (uno despues del otro)
		// Acepta tambien DomString, cadenas de texto que pueden ser insertadas sin la intervencion de un createTextNode
		$featuringContainer.append($loader)

		// Crear una instancia de la interfaz FormData para obtener los valores de los campos de formulario
		// Es importante que los controles de formulario tengan asignado un atributo name.
		// Por tanto, el objeto FormData recibe como parametro el formulario a gestionar
		const data = new FormData($form)
		// Acceder al valor de un control de formulario
		const query_terms = data.get('name')
		// Setear de manera programatica un valor. esto puede servir para colocar información adicional para localizar en un recurso externo
		// data.set('newField', 'otro valor')
		
		// Intentamos ejecutar el siguiente bloque de código
		// Si falla, capturamos el error
		// y procedemos a personalizar el feedback hacia el usuario
		try {
			// La función encargada de renderizar el template con la pelicula solicitada
			// contiene instrucciones asincronas. Es decir, promete a devolver algo en el futuro (el template interpolado)
			// Por tanto indico que espere.... 
			// Pero para ello el handler controlador de este evento ('sbumit') debe prefijarse como async
			const HTMLString = await featuringTemplate(query_terms)
			// Con innerHTML retiro reemplazo todo lo que haya adentro....
			$featuringContainer.innerHTML = HTMLString
		} catch (error) {
			alert(error.message)
			// Retiramos la clase añadida al inicio para no mostrar la seccion de featuring
			$home.classList.remove('search-active')
		}

		// Eliminar el elemento del arbol DOM
		$loader.remove()
	})


	// Esta función contiene instrucciones asincronas
	// Para simplificar y mejorar la lectura de código hago uso de instrucciones async/await
	async function featuringTemplate(query) {
		let peli = await searchMovies(`https://yts.am/api/v2/list_movies.json?limit=1&query_term=${query}`)


		// Asignación por Desestructuracion
		// Permite introducirnos en un objeto o lista para extraer uno o varios datos y asignarlos a otra(s) variable(s)
		// y evitar el hacer referencia a dichos datos de manera encadenada debido a su profundidad
		// objeto.sub-objeto.otro-subobjeto.dato
		// 
		// Me interesa quedarme con el valor del path movie_count, que a su vez esta dentro del path data (el cual se encuentra a nivel de objeto)
		// peli.data.movie_count      data: {movie_count}
		// Me interesa quedarme con el array movies, que esta dentro de data, que a su vez pertenece a el objeto
		// peli.data.movies          data: {movies}
		// 
		// { primervalor, segundovalor, ... } = escupidor_de_informaion
		// 
		// En este caso accedo a data y dentro me quedo con el path movie_count y lo guardo en una constante con ese mismo nomnre
		// Para el caso dos, accedo a data y detro me quedo con el path movies y lo asigno a una variable llamada pelicula
		// El dato que esta despues de los = es de donde vamos a estar escupiendo la info
		const { data: {movie_count}, data: {movies: pelicula} } = peli

		// Una vez resuelta la promesa
		// Verifico en la data devuelta si hay resultados, (ver documentación API)
		if(movie_count) {
			// Si hay resultados, obtengo la primer pelicula que coincide con el termino de busqueda
			
			// Ahora interpolo esa info dentro del literal template y lo retorno.
			// Para que la parte invocadora lo coloque donde necesite
			
			// Aplico desestructuración
			const { medium_cover_image, title } = pelicula[0]

			return (
				`
				<div class="featuring">
					<div class="featuring-image">
					  <!--img src="${pelicula[0].medium_cover_image}" width="70" height="100" alt=""-->
					  <img src="${medium_cover_image}" width="70" height="100" alt="">
					</div>
					<div class="featuring-content">
					  <p class="featuring-title">Pelicula encontrada</p>
					  <!--p class="featuring-album">${pelicula[0].title}</p-->
					  <p class="featuring-album">${title}</p>
					</div>
				</div>
				`
		    )
		} else {
			// Este bloque de código funciona, y muestra un feature con el mensaje de error. Pero
			// esto lo podemos gestionar mediante bloques try/catch para lanzar errores y gestionarlos
			/*return (
				`
				<div class="featuring">
					<div class="featuring-content">
					  <p class="featuring-title">Lo sentimos</p>
					  <p class="featuring-album">La pelicula solicitada no fue encontrada</p>
					</div>
				</div>
				`
		    )*/

		    // Creo un error personalizado y procedo a lanzarlo, dado que en este punto no hay peliculas encontradas
		    throw new Error('No se encontrarón resultados')
		}
	}


	// Esta función permite agregar multiples atributos a un elemento de HTML
	// JS solo permite setear un valor a la vez con setAttribute( )
	function setAttributes($element, attributes) {
		// Recorrer el objeto de propiedades para insertar en el elemento
		for(const attr in attributes) {
			// Para el atributo actual procedemos a establecerlo dentro del elemento
			// El valor de un atributo en un objeto se accede mediante 
			// objeto.atributo --- sin embargo tambien es posible accder en forma de arreglo
			$element.setAttribute(attr, attributes[attr])
			// con getAttribute( ) puedo acceder al valor de un determinado atributo
			console.log($element.getAttribute(attr))
		}
	}


	// Función que se encarga de mostrar el modal en pantalla
	// Para ello es necesario agregar clases de CSS mediante JS a determinados elementos
	// Asi como, añadir reglas de csss en linea
	// 
	// La funcion recibe como argumento un objeto con la información de la pelicula seleccionada (la cual se mostrará dentro del modal)
	function showModal(infoMovie) {
		// Añadir una clase de CSS al elemento sleccionado
		$overlay.classList.add('active')
		// La animación se llama modalIn, dura .8seg y cuando finaliza se queda en el estado final
		$modal.style.animation = 'modalIn .8s forwards'
		// Insertamos como contenido de texto, los datos de la pelicula seleccionada
		$modalTitle.textContent = infoMovie.titulo
		$modalDescrition.textContent = infoMovie.descripcion
		// En este caso, la imagen se le asigna como valor de atributo src, el dato de cover correspondiente a la imagen seleccionada
		// Esto se puede hacer mediante setAttribute( )
		$modalImage.src = infoMovie.cover
	}

	function hideModal() {
		// Remover una clase CSS al elemento seleccionado
		$overlay.classList.remove('active')
		$modal.style.animation = 'modalOut .8s forwards'
	}

	// El hideModal es un boton dentro del modal para cerrarlo cuando se haga clic en el
	// En este caso la función handler se encuentra declarada por separado
	$hideModal.addEventListener('click', hideModal)



	/* 
	
	Apunte:
	Una herramienta útil para trabajar con los elementos del DOM dentro de la Chrome Developer Tools. 
	es el comando $0,  se refiere al elemento seleccionado.

	// agrega una clase
	// $element.classList.add("clase");
	// remueve una clase
	// $element.classList.remove("clase");
	// intercambia entre agregar y remover una clase
	// $element.classList.toggle("clase");

	*/
}

callAPIMovies()


