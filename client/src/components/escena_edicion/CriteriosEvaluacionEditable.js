
function CriterioEvaluacionEditable(props) {
    let ce = props.valor
    return (
        <div className='criterioEvaluacion_editable'
            data-tipo='ce'
            data-idpadre={ce['idPadreCSV']}
            data-id={ce['idCSV']}
            data-nombrecorto={ce['nombreCortoCSV']}
            data-descripcion={ce['descripcionCSV']}
            data-descripcionformato={ce['descripcionFormatoCSV']}
            data-valoresescala={ce['valoresEscalaCSV']}
            data-configuracionescala={ce['configuracionEscalaCSV']}
            data-tiporegla={ce['tipoReglaCSV']}
            data-resultadoregla={ce['resultadoReglaCSV']}
            data-configuracionregla={ce['configuracionReglaCSV']}
            data-idreferenciascruzadascompetencias={ce['idReferenciasCruzadasCompetenciasCSV']}
            data-idexportacion={ce['idExportacionCSV']}
            data-esmarcocompetencias={ce['esMarcoCompetenciasCSV']}
            data-taxonomia={ce['taxonomiaCV']}
        >
            <button className="btn_CE_Editable">{ce['descripcionCSV']}</button>
            <p></p>
        </div>
    )
}

export function CriteriosEvaluacionEditable(props) {
    let criterios = props.ces
    let coleccion = []
    Object.keys(criterios).forEach(key => {
        if (key) {
            coleccion.push(<CriterioEvaluacionEditable valor={criterios[key]} />)
        }
    })
    return (
        <div className='criteriosEvaluacion_editable' >
            <p className="text_CE_Editable">Criterios de evaluación:</p>
            {coleccion}
        </div>
    )
}