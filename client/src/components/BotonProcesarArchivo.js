import { subirArchivoPDF, enviarArchivo, textoArchivo } from './../js/script.js'
import { useContext, useState } from 'react'
import { Marco } from './../App.js'

export function BotonProcesarArchivo(props) {

    const { setContenido, setEscenaActual, procesarActivo, setProcesarActivo } = useContext(Marco)

    async function ProcesarPDF() {
        console.log('Hemos pulsado procesar pdf')
        let texto = await enviarArchivo()
        setContenido(texto)
        setEscenaActual('MarcoCompetencias')
    }

    return (
        <button id='btn_procesar_archivo' className='btn_default' onClick={ProcesarPDF} disabled={!procesarActivo}>Procesar</button>
    )
}