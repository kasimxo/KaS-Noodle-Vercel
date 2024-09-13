import { useContext, useState } from 'react'
import { Marco } from './../App.js'

export var textoArchivo = ''

export function not_implemented(texto) {
    window.alert("¡Ops! Parece que esa función todavía no está implementada" + texto)
    console.log("Se ha ejecutado una función no implementada")
}

//Envia el archivo PDF junto con el tipo de archivo tras hacer las comprobaciones correspondientes al servidor y recibe la respuesta
export function enviarArchivo() {
    var tipo_archivo = document.getElementById('tipo_archivo').value
    if (tipo_archivo === 'NA') {
        console.log('El usuario no ha seleccionado el tipo de archivo')
        return
    }
    console.log(textoArchivo)

    return new Promise((resolve) => {
        var response = fetch("http://localhost:8080/procesadormarco", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/pdf",
                "Access-Control-Allow-Origin": "*",
                "Tipo_archivo": tipo_archivo
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: textoArchivo, // body data type must match "Content-Type" header
        }).then(data => {
            if (data.status === 200) {
                resolve(data.json())
            } else if (data.status === 501) {
                not_implemented('\nEl tipo de boletín seleccionado no está soportado todavía')
            } else {
                console.log("Respuesta alterada:", data.status)
                resolve('Error')
            }
        })
        console.log("Archivo enviado")
    })
}

//Lee el archivo PDF y lo deja 'cargado' en el cliente
//Devuelve la ruta del archivo
export function SubirArchivoPDF() {

    return new Promise((resolve) => {

        var input = document.createElement('input')
        input.type = 'file'
        input.accept = '.pdf'

        input.onchange = e => {
            var file = e.target.files[0]

            var reader = new FileReader()

            reader.readAsDataURL(file);

            reader.onload = () => {

                console.log("Hemos leido el pdf", file)
                textoArchivo = JSON.stringify(reader.result)
                document.getElementById('file_name_PDF').innerHTML = file.name
                document.getElementById('file_name_PDF').classList.replace('invisible', 'visible')

                console.log("Archivo cargado")
                resolve(reader.result)
            }
        }
        input.click()
    })
}
