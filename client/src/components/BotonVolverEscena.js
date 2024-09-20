import { subirArchivoPDF, enviarArchivoPDF, textoArchivo } from '../js/script.js'
import { useContext, useState } from 'react'
import { Marco } from '../App.js'

/** Componente utilizado para volver a una escena.
 * 
 *  Acepta el prop 'escena' (string) que se utilizará para navegar a la escena correspondiente */
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