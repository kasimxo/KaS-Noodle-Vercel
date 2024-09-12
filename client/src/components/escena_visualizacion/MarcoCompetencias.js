import { useContext, useState } from 'react'
import { Marco } from '../../App'

import { Competencias } from './Competencias'
import { BotonExportar } from '../BotonExportar'
import { BotonVolverEscena } from '../BotonVolverEscena'

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


export function MarcoCompetencias(props) {
    let { contenido, escenaActual } = useContext(Marco)
    if (contenido !== undefined) {
        return (
            <section className={escenaActual === 'MarcoCompetencias' ? '' : 'invisible'}>
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
                    <p>{contenido['descripcionCSV']}</p>
                    <b>Competencias:</b>
                    <Competencias competencias={contenido['competencias']} />
                </article>
                <article className='contenedor_botones'>
                    <BotonVolverEscena escena='SeleccionarArchivo' />
                    <BotonExportar />
                </article>
            </section>
        )
    }
}
