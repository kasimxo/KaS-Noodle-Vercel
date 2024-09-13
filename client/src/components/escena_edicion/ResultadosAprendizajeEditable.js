import { useState } from "react"
import { CriteriosEvaluacionEditable } from "./CriteriosEvaluacionEditable"

function ResultadoAprendizajeEditable(props) {
    let resultadoAprendizaje = props.valor
    const [pulsado, setPulsado] = useState(false)

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
            <button id='btn_RA' className='btn_RA' >{resultadoAprendizaje['nombreCortoCSV']} - {resultadoAprendizaje['descripcionCSV']}</button>
            <div className={'visible'}>
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
        <div className='resultadosAprendizaje'>
            <p>Resultados de aprendizaje:</p>
            {coleccion}
        </div>
    )
}