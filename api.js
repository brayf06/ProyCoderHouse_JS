///// API CONVERSION //////
var myHeaders = new Headers();
myHeaders.append("apikey", "pPZ1cy9S9NAId5PryRIf73mlQC7FKAy1");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

let url = 'https://api.apilayer.com/currency_data/convert?to=UYU&from=USD&amount=5'
console.log(url)

fetch(url, requestOptions)
	.then(response => 
        response.json()
    )
	.then((valor) => {
        precioConvertido = valor.result
        document.getElementById('precio-final-UYU').innerHTML = `
        <div>
        <h3 id="precio">
            ${precioConvertido}
        </h3>
        </div>
    `
    } 
    )
	.catch(err =>
        Swal.fire(
        '',
        '"Error"' + error,
        'error'
      )
    );