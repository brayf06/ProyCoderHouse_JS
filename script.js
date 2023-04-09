let dbClientes = []
let listadoItems = [];
let valorSeguro = 0;
let ciCliente = 0;
const listaItems = document.querySelector("#lista-items") 
const contenedorLista = document.querySelector('#tabla-lista tbody') 
const lista = document.querySelector('#carrito'); 
document.getElementById('btnPago').style.display = 'none';
document.getElementById('div-lista').style.display = 'none';

function nuevoClienteDB(){
    let cliente ={
        nombre: nombreCliente ,
        documento: documentoCliente,
        direccion: direccionCliente,
        telefono: telefonoCliente
    }
    return cliente
}

function nuevoCliente(){
    var nombreCliente = document.getElementById("nombre").value
    var documentoCliente = document.getElementById("documento").value
    var direccionCliente = document.getElementById("direccion").value
    var telefonoCliente = document.getElementById("telefono").value
    
    var nuevoClienteDB = { nombre: nombreCliente, documento: documentoCliente, direccion: direccionCliente, telefono: telefonoCliente}
    ciCliente = documentoCliente
    dbClientes = recuperarClientes()
    let ciAnterior = 0;
    if (Array.from(dbClientes).length === 0)
    {
        dbClientes.push(nuevoClienteDB)
            Swal.fire(
            'Bienvenido',
            '"Cliente agregado con exito, sera redireccionado en 2 segundos"',
            'success'
            )
    
            storageCliente()
            storageCICliente()
            setTimeout( function() { window.location.href = "seguros.html"; }, 2000 );
    }
    else if (Array.from(dbClientes).length != 0){
        let ci = 0;
        let mapeo = dbClientes.map((cliente) => cliente.documento)
        for (var i = 0; i <= mapeo.length; i++)
        {
            ci = mapeo[i];
            if (ci === documentoCliente)
            {
                Swal.fire(
                    'Bienvenido',
                    '"Bienvenido de nuevo, sera redirigido a su resumen"',
                    'success'
                  )
                  storageCICliente()
                  setTimeout( function() { window.location.href = "resumen.html"; }, 2000 );
                  ciAnterior = documentoCliente
            }
        }
        if(ciAnterior === 0){
            dbClientes.push(nuevoClienteDB)
                    Swal.fire(
                    'Bienvenido',
                    '"Cliente agregado con exito, sera redireccionado en 2 segundos"',
                    'success'
                    )
        
                    storageCliente()
                    storageCICliente()
                    setTimeout( function() { window.location.href = "seguros.html"; }, 2000 );
        }   
    }
}
function storageCliente(){
    localStorage.setItem('cliente', JSON.stringify(dbClientes))
}

function recuperarClientes(){
    return JSON.parse(localStorage.getItem('cliente'))  || []
}

function recuperarLista(){
    return JSON.parse(localStorage.getItem('lista'))  || []
}

function storageCICliente(){
    localStorage.setItem('clienteActual', JSON.stringify(ciCliente))
}

listaItems.addEventListener('click', agregarItem) 


function agregarItem(evt){ 
    evt.preventDefault() 

    if(evt.target.classList.contains('agregar-lista')) { 
        const item = evt.target.parentElement.parentElement; 
        leerDatos(item) 
    }

}
function limpiar(){
    document.getElementById("seguroauto").value = '';
    document.getElementById("segurocasa").value = '';
    document.getElementById("segurocompu").value = '';
}

function leerDatos(item){ 
    let ciLogeada = JSON.parse(localStorage.getItem('clienteActual'))
    let dataid = item.querySelector('a').getAttribute('data-id')
    if (dataid == 1){
        precio = document.getElementById("seguroauto").value
        if (precio < 2500 ){
            valorSeguro = (precio * (1.22) + 5000)
        }
        else
        {
            valorSeguro = (precio * (1.22) + 8000)
        }
        
    }
    else if(dataid == 2){
        precio = document.getElementById("segurocasa").value
        if (precio < 2500 ){
            valorSeguro = (precio * (1.22) + 7500)
        }
        else
        {
            valorSeguro = (precio * (1.22) + 15000)
        }
        
    }
    else if(dataid == 3){
        precio = document.getElementById("segurocompu").value
        if (precio < 2500 ){
            valorSeguro = (precio * (1.22) + 2500)
        }
        else
        {
            valorSeguro = (precio * (1.22) + 10000)
        }
        
    }
    const infoItem = {
        imagen: item.querySelector('img').src, 
        titulo: item.querySelector('h5').textContent, 
        precio: valorSeguro, 
        id: dataid,
        clienteActual: ciLogeada,
        cantidad: 1
    }

    
    if(listadoItems.some( item => item.id === infoItem.id)){ 
        const items = listadoItems.map( item => { 
            if(item.id === infoItem.id){ 
                let cantidad = parseInt(item.cantidad); 
                cantidad +=1; 
                item.cantidad = cantidad; 
                let precio = parseInt(item.precio)
                precio += valorSeguro;
                item.precio = precio
                return item 
            }else {
                return item 
            }
        })
        listadoItems = [...items]
    } else {
        listadoItems = [...listadoItems, infoItem] 
    }
    
    listaHTML()
    limpiar()
    mostrar()
}

function listaHTML(){
    vaciarLista(); 
    listadoItems.forEach( item => {
        const row = document.createElement('tr'); 
        
        row.innerHTML = `
            <td>
                <img src="${item.imagen}" width="100"/>
            </td>
            <td>${item.titulo}</td>
            <td>${item.precio}</td>
            <td>${item.cantidad}</td>
            <td>
                
            </td>
        `;
        contenedorLista.appendChild(row);
    })

    listaLocalStorage();
}

function vaciarLista(){ 
    while(contenedorLista.firstChild) {
        contenedorLista.removeChild(contenedorLista.firstChild)
    }
} 

function listaLocalStorage(){
    localStorage.setItem('lista', JSON.stringify(listadoItems))
}

function mostrar(){
    document.getElementById('btnPago').style.display = 'block';
    document.getElementById('div-lista').style.display = 'flex';
}

