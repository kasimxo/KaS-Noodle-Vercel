import express from 'express'
import cors from 'cors'
import { pdfToMarco } from './clases/pdfToMarco.js'
import { csvToMarco } from './clases/csvToMarco.js'
import path from 'node:path'
const app = express()

app.disable('x-powered-by')

app.listen(8080)

//Middleware
app.use(cors())


app.post('/procesadormarco', function (req, res) {
    console.log('Se va a procesar un archivo')
    let tipo_archivo = req.header("Tipo_archivo")
    if (tipo_archivo !== 'BOA' && tipo_archivo !== 'csv') {
        console.log('Solicitud de un boletín oficial todavía no implementado ' + tipo_archivo)
        res.status(501)
        res.end()
        return
    } else {
        console.log('El tipo de archivo es válido')
    }
    let body = '';
    //Leemos el base64 enviado como pdf a trozos y lo almacenamos en variable
    req.on('data', chunk => {
        body += chunk.toString()
    })
    req.on('end', () => {

        if (tipo_archivo === 'csv') {
            csvToMarco(body).then((marcoJSON) => {
                console.log("Se va a enviar la respuesa")
                res.send(marcoJSON)
            })
        } else {
            pdfToMarco(body).then((marcoJSON) => {
                console.log("Se va a enviar la respuesa")
                res.send(marcoJSON)
            })
        }
    })
})

app.get('/favicon.ico', function (req, res) {
    res.sendFile(path.join('static', 'favicon.ico'), { root: 'public' })
});

app.get('/', function (req, res) {
    res.end("Alive: 200")
    //res.sendFile(path.join('index.html'), { root: 'public' })
})

app.get('/prueba', function (req, res) {
    console.log('Petición de prueba')
    res.sendFile(path.join('404.html'), { root: 'public' })
})


console.log("Servidor iniciado")