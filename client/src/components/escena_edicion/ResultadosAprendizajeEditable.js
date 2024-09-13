import { useState } from "react"
import { CriteriosEvaluacionEditable } from "./CriteriosEvaluacionEditable"

import right_arrow from './../../static/Right_arrow_icon.png'
import down_arrow from './../../static/Down_arrow_icon.png'

function ResultadoAprendizajeEditable(props) {
    let resultadoAprendizaje = props.valor

    const [pulsado, setPulsado] = useState(false)
    const [icon, setIcon] = useState(<img src={right_arrow} className='icon_16' alt='Icono para desplegar' title='Pulsa para abrir el detalle de la competencia' />)

    function expandirRA() {
        if (pulsado) {
            setPulsado(false)
            setIcon(<img src={right_arrow} className='icon_16' alt='Icono para colapsar' title='Pulsa para cerrar el detalle de la competencia' />)
        } else {
            setPulsado(true)
            setIcon(<img src={down_arrow} className='icon_16' alt='Icono para desplegar' title='Pulsa para abrir el detalle de la competencia' />)
        }
    }

    return (
        <div className='resultadoAprendizaje'
            data-tipo='ra'
            data-idpadre={resultadoAprendizaje['idPadreCSV']}
            data-id={resultadoAprendizaje['idCSV']}
            data-nombrecorto={resultadoAprendizaje['nombreCortoCSV']}
            data-descripcion={resultadoAprendizaje['descripcionCSV']}
            data-descripcionformato={resultadoAprendizaje['descripcionFormatoCSV']}
            data-valoresescala={resultadoAprendizaje['valoresEscalaCSV']}
            data-configuracionescala={resultadoAprendizaje['configuracionEscalaCSV']}
            data-tiporegla={resultadoAprendizaje['tipoReglaCSV']}
            data-resultadoregla={resultadoAprendizaje['resultadoReglaCSV']}
            data-configuracionregla={resultadoAprendizaje['configuracionReglaCSV']}
            data-idreferenciascruzadascompetencias={resultadoAprendizaje['idReferenciasCruzadasCompetenciasCSV']}
            data-idexportacion={resultadoAprendizaje['idExportacionCSV']}
            data-esmarcocompetencias={resultadoAprendizaje['esMarcoCompetenciasCSV']}
            data-taxonomia={resultadoAprendizaje['taxonomiaCV']}
        >
            <div className="horizontal">
                <button id='btn_RA' className='btn_RA_Editable' onClick={expandirRA}>{icon}</button>
                <button id='btn_RA' className='btn_RA_Editable' >{resultadoAprendizaje['descripcionCSV']}</button>
            </div>
            <div className={pulsado ? 'visible padding_10' : 'invisible'}>
                <CriteriosEvaluacionEditable ces={resultadoAprendizaje['criterios']} />
            </div>
        </div>
    )
}

export function ResultadosAprendizajeEditable(props) {
    let ras = props.ras
    let coleccion = []
    Object.keys(ras).forEach(key => {
        if (key) {
            coleccion.push(<ResultadoAprendizajeEditable valor={ras[key]} />)
        }
    })
    return (
        <div className='resultadosAprendizaje_editable'>
            <p className="text_RA_Editable">Resultados de aprendizaje:</p>
            {coleccion}
        </div>
    )
}