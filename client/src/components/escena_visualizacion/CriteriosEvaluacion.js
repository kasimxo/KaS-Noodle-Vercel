function CriterioEvaluacion(props) {
    let ce = props.valor
    return (
        <div className='criterioEvaluacion'
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
            <p>{ce['nombreCortoCSV']} - {ce['descripcionCSV']}</p>
        </div>
    )
}

export function CriteriosEvaluacion(props) {
    let criterios = props.ces
    let coleccion = []
    Object.keys(criterios).forEach(key => {
        if (key) {
            coleccion.push(<CriterioEvaluacion valor={criterios[key]} />)
        }
    })
    return (
        <div className='criteriosEvaluacion' >
            <p>Criterios de evaluación:</p>
            {coleccion}
        </div>
    )
}
