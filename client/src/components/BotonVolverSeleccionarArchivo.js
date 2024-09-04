import { subirArchivoPDF, enviarArchivo, textoArchivo } from './../js/script.js'
import { useContext, useState } from 'react'
import { Marco } from './../App.js'

export function BotonVolverSeleccionarArchivo(props) {

    const { setContenido, setEscenaActual } = useContext(Marco)

    function VolverSeleccionarArchivo() {
        console.log('Hemos pulsado volver a seleccionar archivo')
        setEscenaActual('SeleccionarArchivo')
    }

    return (
        <button id='btn_procesar_archivo' className='btn_default' onClick={VolverSeleccionarArchivo}>Volver</button>
    )
}