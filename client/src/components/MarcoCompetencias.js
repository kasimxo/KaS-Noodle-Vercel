import { useContext, useState } from 'react'
import { Marco } from './../App'

import { BotonExportar } from './BotonExportar'

import right_arrow from './../static/Right_arrow_icon.png'
import down_arrow from './../static/Down_arrow_icon.png'

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

function CriteriosEvaluacion(props) {
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

function ResultadoAprendizaje(props) {
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
            <button id='btn_RA' className='btn_RA' onClick={expandirRA}>{icon} {resultadoAprendizaje['nombreCortoCSV']} - {resultadoAprendizaje['descripcionCSV']}</button>
            <div className={pulsado ? 'visible' : 'invisible'}>
                <CriteriosEvaluacion ces={resultadoAprendizaje['criterios']} />
            </div>
        </div>
    )
}

function ResultadosAprendizaje(props) {
    let ras = props.ras
    let coleccion = []
    Object.keys(ras).forEach(key => {
        if (key) {
            coleccion.push(<ResultadoAprendizaje valor={ras[key]} />)
        }
    })
    return (
        <div className='resultadosAprendizaje'>
            <p>Resultados de aprendizaje:</p>
            {coleccion}
        </div>
    )
}

function Competencia(props) {
    let comp = props.valor
    const [pulsado, setPulsado] = useState(false)
    const [icon, setIcon] = useState(<img src={right_arrow} className='icon_16' alt='Icono para desplegar' title='Pulsa para abrir el detalle de la competencia' />)
    function expandirCOMP() {
        if (pulsado) {
            setPulsado(false)
            setIcon(<img src={right_arrow} className='icon_16' alt='Icono para colapsar' title='Pulsa para cerrar el detalle de la competencia' />)
        } else {
            setPulsado(true)
            setIcon(<img src={down_arrow} className='icon_16' alt='Icono para desplegar' title='Pulsa para abrir el detalle de la competencia' />)
        }
        console.log(comp['nombreCortoCSV'])
    }
    return (
        <div className='competencia'
            data-tipo='competencia'
            data-idpadre={comp['idPadreCSV']}
            data-id={comp['idCSV']}
            data-nombrecorto={comp['nombreCortoCSV']}
            data-descripcion={comp['descripcionCSV']}
            data-descripcionformato={comp['descripcionFormatoCSV']}
            data-valoresescala={comp['valoresEscalaCSV']}
            data-configuracionescala={comp['configuracionEscalaCSV']}
            data-tiporegla={comp['tipoReglaCSV']}
            data-resultadoregla={comp['resultadoReglaCSV']}
            data-configuracionregla={comp['configuracionReglaCSV']}
            data-idreferenciascruzadascompetencias={comp['idReferenciasCruzadasCompetenciasCSV']}
            data-idexportacion={comp['idExportacionCSV']}
            data-esmarcocompetencias={comp['esMarcoCompetenciasCSV']}
            data-taxonomia={comp['taxonomiaCV']}
        >
            <button id='btn_Comp' className='btn_Comp' onClick={expandirCOMP}>{icon} {comp['nombreCortoCSV']}</button>
            <div className={pulsado ? 'visible' : 'invisible'}>
                <ResultadosAprendizaje ras={comp['ras']} />
            </div>
        </div>
    )
}

function Competencias(props) {
    let competencias = props.competencias
    let coleccion = []
    Object.keys(competencias).forEach(key => {
        if (key) {
            coleccion.push(<Competencia valor={competencias[key]} />)
        }
    })
    return (
        <div className='competencias'>
            {coleccion}
        </div>
    )
}

export function MarcoCompetencias(texto) {
    let { contenido } = useContext(Marco)
    if (contenido !== undefined) {
        return (
            <div className='marco'
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
                <BotonExportar />
            </div>
        )
    } else {
        return (
            <div className='marco'>
                <p>Marco de competencias: Todavía no has cargado un marco de competencias</p>
            </div>
        )
    }
}
