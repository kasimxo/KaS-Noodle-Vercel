import express from 'express'
import cors from 'cors'
import { pdfToMarco } from './clases/pdfToMarco.js'
import path from 'node:path'
const app = express()

app.disable('x-powered-by')

app.listen(8080)

//Middleware
app.use(cors())


app.post('/procesadormarco', function (req, res) {
    console.log('Se va a procesar un archivo')
    let tipo_archivo = req.header("Tipo_archivo")
    if (tipo_archivo !== 'BOA') {
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
        pdfToMarco(body).then((marcoJSON) => {
            console.log("Se va a enviar la respuesa")
            res.send(marcoJSON)
        })
    })
})

app.get('/favicon.ico', function (req, res) {
    res.sendFile(path.join('static', 'favicon.ico'), { root: 'public' })
});
app.get('/static/NoodleLogotipoExtended_Inv720.png', function (req, res) {
    res.sendFile(path.join('static', 'NoodleLogotipoExtended_Inv720.png'), { root: 'public' })
})
app.get('/css/style.css', function (req, res) {
    res.sendFile(path.join('css', 'style.css'), { root: 'public' })
})
app.get('/static/pdf_icon.png', function (req, res) {
    res.sendFile(path.join('static', 'pdf_icon.png'), { root: 'public' })
})
app.get('/static/csv_icon.png', function (req, res) {
    res.sendFile(path.join('static', 'csv_icon.png'), { root: 'public' })
})
app.get('/js/script.js', function (req, res) {
    res.sendFile(path.join('js', 'script.js'), { root: 'public' })
})
app.get('/', function (req, res) {
    res.end("Alive: 200")
    //res.sendFile(path.join('index.html'), { root: 'public' })
})

app.get('/prueba', function (req, res) {
    console.log('Petición de prueba')
    res.sendFile(path.join('404.html'), { root: 'public' })
})


console.log("Servidor iniciado")