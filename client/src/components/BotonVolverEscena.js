import { subirArchivoPDF, enviarArchivo, textoArchivo } from '../js/script.js'
import { useContext, useState } from 'react'
import { Marco } from '../App.js'

export function BotonVolverEscena(props) {
    //Indicamos a que escena volver
    let escena = props.escena

    const { setContenido, setEscenaActual } = useContext(Marco)

    function VolverEscena() {
        console.log('Hemos pulsado volver a seleccionar archivo')
        setEscenaActual(props.escena)
    }

    return (
        <button id='btn_procesar_archivo' className='btn_default' onClick={VolverEscena}>Volver</button>
    )
}