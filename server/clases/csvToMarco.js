
import { parse } from 'csv-parse';
import { MarcoCompetenciasDTO } from './MarcoCompetenciasDTO.js';

export function csvToMarco(body) {
    return new Promise(function (resolve, err) {

        rawToArray(body).then((data) => {
            resolve(data)
        })
    })
}

function procesarTexto(body) {
    let marco = new MarcoCompetenciasDTO()

    let incluyeCabeceras = true
    //Desde qué fila se va a empezar a procesar el CSV
    //Si tiene fila de cabeceras, la saltamos
    let startingIndex = 1
    let csv = Array.from(body)

    //Primero determinamos si el csv en cuestión tiene las cabeceras

    let cabeceras = csv[0]
    if (cabeceras[0] === 'Identificador padre') {
        console.log('Se han identificado correctamente las cabeceras')
    } else {
        console.log('No se han identificado las cabeceras')
        incluyeCabeceras = false
        //Como no se han identificado cabeceras, empezamos a procesar desde la fila 0
        startingIndex = 0
    }
    /**
     *  Guía de formato del CSV:
        00 - '"Identificador padre",
        01 - "Identificador",
        02 - "Nombre corto",
        03 - "Descripción",
        04 - "Descripción del formato",
        05 - "Valores de escala",
        06 - "Configuración de escala",
        07 - "Tipo de regla (opcional)",
        08 - "Resultado de la regla (opcional)",
        09 - "Configuración de regla (opcional)",
        10 - "Identificadores de referencias cruzadas de competencias",
        11 - "Identificador de la exportación (opcional)",
        12 - "Es marco de competencias",
        13 - "Taxonomía"'
    */
    for (let i = startingIndex; i < csv.length; i++) {
        let linea = csv[i]

        //Primero comprobamos si es marco de competencias
        if (linea[12] == 1) {
            //Esta fila es un marco de competencias
            marco.fromCSV(linea)
        } else if (linea[0] == "") {
            //Al no tener un identificador padre es una competencia
            marco.addCompetenciaFromCSV(linea);
        } else {
            //No se puede distinguir entre RA y CE
            marco.addResultadoCriterioFromCSV(linea);
        }
    }

    console.log(marco)
    return marco

}

function rawToArray(body) {

    return new Promise(function (resolve, err) {

        const records = [];
        // Initialize the parser
        const parser = parse({
            delimiter: ','
        });


        // Write data to the stream
        parser.write(body);
        parser.end()

        // Use the readable stream api to consume records
        parser.on('readable', function () {
            let record;
            while ((record = parser.read()) !== null) {
                records.push(record);
            }
        });
        // Catch any error
        parser.on('error', function (err) {
            console.error(err.message);
        });
        // Test that the parsed records matched the expected records
        parser.on('end', function () {
            let marco = procesarTexto(records)
            resolve(marco)
        });

    })

}