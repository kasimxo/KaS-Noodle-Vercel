import { enviarArchivoPDF, enviarArchivoCSV } from '../../js/script.js'
import { useContext, useState } from 'react'
import { Marco } from '../../pages/Layout'
import { Link, Navigate } from 'react-router-dom'

export function BotonProcesarArchivo(props) {

    const {
        setContenido,
        setEscenaActual,
        procesarActivo,
        tipoArchivo
    } = useContext(Marco)

    const [listo, setListo] = useState(false)

    async function Procesar() {

        if (tipoArchivo === 'pdf') {
            let texto = await enviarArchivoPDF()
            setContenido(texto)
            setListo(true)
            //setEscenaActual('MarcoCompetencias')
        } else if (tipoArchivo === 'csv') {
            let texto = await enviarArchivoCSV()
            setContenido(texto)
            setListo(true)

            //setEscenaActual('MarcoCompetencias')
        }

    }

    return (
        <div>

            <button id='btn_procesar_archivo' className='btn_default' onClick={Procesar} disabled={!procesarActivo}>Procesar</button>
            {listo && <Navigate to={'/view'} replace={true} />}
        </div>
    )
}