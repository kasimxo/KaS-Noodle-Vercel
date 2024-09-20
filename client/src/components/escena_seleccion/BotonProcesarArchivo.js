import { enviarArchivoPDF, enviarArchivoCSV } from '../../js/script.js'
import { useContext, useState } from 'react'
import { Marco } from '../../App.js'

export function BotonProcesarArchivo(props) {

    const {
        setContenido,
        setEscenaActual,
        procesarActivo,
        tipoArchivo
    } = useContext(Marco)

    async function Procesar() {
        console.log('Hemos pulsado procesar', tipoArchivo)

        if (tipoArchivo === 'pdf') {
            let texto = await enviarArchivoPDF()
            setContenido(texto)
            setEscenaActual('MarcoCompetencias')
        } else if (tipoArchivo === 'csv') {
            let texto = await enviarArchivoCSV()
            setContenido(texto)
            setEscenaActual('MarcoCompetencias')
        }

    }

    return (
        <button id='btn_procesar_archivo' className='btn_default' onClick={Procesar} disabled={!procesarActivo}>Procesar</button>
    )
}