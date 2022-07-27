//variables
const marca = document.querySelector('#marca'); 
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');  
const maximo = document.querySelector('#maximo'); 
const puertas = document.querySelector('#puertas'); 
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');  

//contenedor de los resultados
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();//te da el año en curso
const min = max - 10;

//generar un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    puertas: '',
    transmision: '',    
    color: '',

}


//eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); //muestra los automoviles al cargar

    llenarSelect(); //llena las opciones de años
});

//event listener para los select de busqueda
marca.addEventListener('change', (e) => {
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
})

year.addEventListener('change', (e) => {
    datosBusqueda.year = parseInt(e.target.value);

    filtrarAuto();
})

minimo.addEventListener('change', (e) => {
    datosBusqueda.minimo = e.target.value;

    filtrarAuto();
})

maximo.addEventListener('change', (e) => {
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();
})

puertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = parseInt(e.target.value);

    filtrarAuto();
})

transmision.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();
})

color.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value;
    
    filtrarAuto();
})




//Funciones

//funcion donde se muestran los autos en html
function mostrarAutos(autos) {
    limpiarHTML();//elimina el html previo

    autos.forEach(auto => {

        const {marca , modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
            ${marca}  ${modelo} - ${year} - ${puertas} Puertas - Transmición: ${transmision} - Precio:${precio} -
            Color: ${color}
        `;

        //insertar en el html
        resultado.appendChild(autoHTML);

    });
}

//limpiar html
function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

//genera los años del select
function llenarSelect() {
    for(let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);//agrega las opciones de año al select
    }
}

//funcion que filtra en base ala busqueda
function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMin).filter(filtrarMax).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)
    //console.log(resultado);

    

    if(resultado.length) {
        mostrarAutos(resultado);
    }else{
        noResultado();
    }

}

function noResultado() { // para que salga un comentario que no hay datos
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay Resultados';
    resultado.appendChild(noResultado); 
}

function filtrarMarca(auto) {
    const {marca} = datosBusqueda;
    if( marca ) {
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto) {
    const {year} = datosBusqueda;

    if( year ) {
        return auto.year === year;
    }
    return auto;
}

function filtrarMin(auto) {
    const {minimo} = datosBusqueda;

    if( minimo ) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMax(auto) {
    const {maximo} = datosBusqueda;

    if( maximo ) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda;
    
    if( puertas ) {
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda;
    
    if( transmision ) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    const {color} = datosBusqueda;
    
    if( color ) {
        return auto.color === color;
    }
    return auto;
}



