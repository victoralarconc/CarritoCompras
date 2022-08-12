//variables
const carrrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn= document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];



cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregar un curso presionando 'agregar al carrito'
    listaCursos.addEventListener('click', agregarCurso);

    //Elmina cursos del carrito

    carrito.addEventListener('click', eliminarCurso);

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito =[]; // resetamos el arreglo

        limpiarHTML(); //Eliminamos todo el html
    });
}

//funciones

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado= e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
    
}
//Elimina un curso del carrito

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        console.log(articulosCarrito);

        carritoHTML(); //iterar sobre el carrito y mostrar su html
    }



}
//lee el contenido del html al que le dimos click y extrae la informacion del curso

function leerDatosCurso(curso){
    //console.log(curso);

    //crear un objeto con el contenido del curso actual
    const infoCurso={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }
    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id===infoCurso.id);
    if(existe){
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id===infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            }else{
                return curso;//retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito= [...cursos];
    }else{
        //Agregamos el curso al carrito
        articulosCarrito=[...articulosCarrito, infoCurso];
    }

    //agregar elementos al arreglo de carrito
    
    console.log(articulosCarrito);
    carritoHTML();
}

//Muestra el carrito de comrpas en el html

function carritoHTML(){

    //Limpiar HTML
    limpiarHTML();
    //Recorre el carritoy genera el html
    articulosCarrito.forEach((curso)=>{
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href = "#" class ="borrar-curso" data-id = "${id}"> X </td>
        `;
        //agregar el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

//Eliminar los cursos del tbody

function limpiarHTML(){
    //forma lenta
    contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    };
}

