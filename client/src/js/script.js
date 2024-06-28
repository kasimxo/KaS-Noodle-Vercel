
export function not_implemented() {
    window.alert("No implementado todavía")
    console.log("Se ha ejecutado una función no implementada")
}

function mostrarMarco(marco) {
    console.log(marco)
}

export function subirArchivoPDF() {
    var input = document.createElement('input')
    input.type = 'file'
    input.accept = '.pdf'

    input.onchange = e => {
        var file = e.target.files[0]

        var reader = new FileReader()

        reader.readAsDataURL(file);

        reader.onload = () => {

            console.log("Hemos leido el pdf", file)

            // eslint-disable-next-line no-unused-vars
            var response = fetch("http://localhost:8080/procesadormarco", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/pdf",
                    "Access-Control-Allow-Origin": "*"
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(reader.result), // body data type must match "Content-Type" header
            }).then(data => {
                if (data.status === 200) {
                    console.log("Respuesta recibida")
                    mostrarMarco(data)
                }
            })
            console.log("Archivo enviado")

        }

    }

    input.click()
}

document.addEventListener('DOMContentLoaded', function () {
    //const loadEl = document.querySelector('#load');
});