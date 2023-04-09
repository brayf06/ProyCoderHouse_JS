let precioFinal = 0
let precioConvertido = 0
let ciFactura = JSON.parse(localStorage.getItem('clienteActual'))
let datosCliente = [];
let listaCliente = [];

window.addEventListener('load', () => {
    const data = JSON.parse(localStorage.getItem('cliente'))
    data.forEach(datas =>  {
        if(datas.documento === ciFactura){
            datosCliente.push(datas)
            document.getElementById('tabla').innerHTML = `
                <div>
                ${crearTabla(datosCliente)}
                </div>
            `
        }
        
    })
    
})

const crearTabla = (clientes) => {
    return `
    
    <table id="tablaCliente">
            <tr>
                <th>Nombre</th>
                <th>Documento</th>
                <th>Direccion</th>
                <th>Telefono</th>
            </tr>
           <tbody>
    ${crearTablaDatos(clientes)}
           </tbody>
        </table>

    `
}

const crearTablaDatos = (clientes) => {
    let html = ''
    clientes.forEach(cliente =>  {
        html += `
        <tr>
            <td>${cliente.nombre}</td>
            <td>${cliente.documento}</td>
            <td>${cliente.direccion}</td>
            <td>${cliente.telefono}</td>
        </tr>
        `
    });
    return html;
}



window.addEventListener('load', () => {
    const data = JSON.parse(localStorage.getItem('lista'))
    data.forEach(datas =>  {
        if(datas.clienteActual === ciFactura){
            listaCliente.push(datas)
            document.getElementById('tabla-factura').innerHTML = `
            <div>
                ${crearTablaItems(listaCliente)}
            </div>
            `
        }     
    }
    )
})

const crearTablaItems = (items) => {
    return `
    
    <table id="tablaFactura">
            <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio Final</th>
                <th>Cantidad</th>
            </tr>
           <tbody>
    ${crearTablaFactura(items)}
           </tbody>
        </table>

    `
}

const crearTablaFactura = (items) => {
    let html = ''
    items.forEach(item => {
        html += `
        <tr>
            <td>
                <img src="${item.imagen}" width="100"/>
            </td>
            <td>${item.titulo}</td>
            <td>${item.precio}</td>
            <td>${item.cantidad}</td>
        </tr>
        `
        let precio = parseInt(item.precio)
        precioFinal += precio;
    });
    
    
    return html;
}

window.addEventListener('load', () => {
    document.getElementById('precio-final').innerHTML = `
    <div>
        <h3 id="precio">
            ${precioFinal}
        </h3>
    </div>
    `    
    usoApi(precioFinal)
})



function usoApi(valor){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '48ae10a80cmsh454cca2e44dd36cp1859ebjsn53ff32e3933b',
            'X-RapidAPI-Host': 'currency-converter-pro1.p.rapidapi.com'
        }
    };
    
    let url = `https://currency-converter-pro1.p.rapidapi.com/convert?from=UYU&to=USD&amount=${valor}` 
    fetch(url, options)
        .then(response => response.json())
        .then((val) => {
            precioConvertido = val.result
            document.getElementById('precio-final-UYU').innerHTML = `
            <div>
            <h3 id="precio-final-UYU">
                ${precioConvertido}
            </h3>
            </div>
        `
        } )
        .catch(err =>
            console.log(val)
            // Swal.fire(
            // '',
            // '"Error"' + err.message,
            // 'error'
          );
}
