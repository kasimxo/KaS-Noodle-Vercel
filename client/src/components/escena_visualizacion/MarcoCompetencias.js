import { createContext, useContext, useState } from 'react'
import { Marco } from '../../pages/Layout'

import { Competencias } from './Competencias'
import { BotonExportar } from './BotonExportar'
import { BotonVolverEscena } from '../BotonVolverEscena'
import { BotonesSeleccion } from './BotonesSeleccion'

/*
data-idpadre=''
data-id=''
data-nombrecorto=''
data-descripcion=''
data-descripcionformato=''
data-valoresescala=''
data-configuracionescala=''
data-tiporegla=''
data-resultadoregla=''
data-configuracionregla=''
data-idreferenciascruzadascompetencias=''
data-idexportacion=''
data-esmarcocompetencias=''
data-taxonomia=''
*/

export const EscenaVisualizacion = createContext()

//Se puede hacer que las competencias para exportar se almacenen dentro del contexto

const EscenaVisualizacionProvider = ({ children }) => {
    const [competenciasSeleccionadasNum, setCompetenciasSeleccionadasNum] = useState(0)
    //Un diccionario que almacena todas las competencias listas para exportarse
    const [competenciasSeleccionadas, setCompetenciasSeleccionadas] = useState({})

    return (
        <EscenaVisualizacion.Provider value={
            {
                competenciasSeleccionadasNum, setCompetenciasSeleccionadasNum,
                competenciasSeleccionadas, setCompetenciasSeleccionadas
            }
        }>
            {children}
        </EscenaVisualizacion.Provider>
    )
}

export function MarcoCompetencias(props) {

    let { contenido, escenaActual } = useContext(Marco)


    if (contenido !== undefined) {
        return (
            <section className='MarcoCompetencias'>
                <EscenaVisualizacionProvider>

                    <article className='marco'
                        data-tipo='marco'
                        data-idpadre={contenido['idPadreCSV']}
                        data-id={contenido['idCSV']}
                        data-nombrecorto={contenido['nombreCortoCSV']}
                        data-descripcion={contenido['descripcionCSV']}
                        data-descripcionformato={contenido['descripcionFormatoCSV']}
                        data-valoresescala={contenido['valoresEscalaCSV']}
                        data-configuracionescala={contenido['configuracionEscalaCSV']}
                        data-tiporegla={contenido['tipoReglaCSV']}
                        data-resultadoregla={contenido['resultadoReglaCSV']}
                        data-configuracionregla={contenido['configuracionReglaCSV']}
                        data-idreferenciascruzadascompetencias={contenido['idReferenciasCruzadasCompetenciasCSV']}
                        data-idexportacion={contenido['idExportacionCSV']}
                        data-esmarcocompetencias={contenido['esMarcoCompetenciasCSV']}
                        data-taxonomia={contenido['taxonomiaCV']}

                    >
                        <p className='titulo'>{contenido['descripcionCSV']}</p>

                        <BotonesSeleccion />
                        <Competencias competencias={contenido['competencias']} />
                    </article>
                    <article className='contenedor_botones_pie'>
                        <BotonVolverEscena escena='SeleccionarArchivo' />
                        <BotonExportar />
                    </article>
                </EscenaVisualizacionProvider>
            </section>
        )
    } else {
        return (
            <h1>Error con {contenido}</h1>
        )
    }
}
