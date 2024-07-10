import { useContext, useState } from 'react'
import { Marco } from './../App'

function CriterioEvaluacion(props) {
    let ce = props.valor
    return (
        <div className='criterioEvaluacion'>
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
        <div className='criteriosEvaluacion'>
            <p>Criterios de evaluación:</p>
            {coleccion}
        </div>
    )
}

function ResultadoAprendizaje(props) {
    let resultadoAprendizaje = props.valor
    const [pulsado, setPulsado] = useState(false)
    const [listado, setListado] = useState()
    function expandirRA() {
        console.log("Hemos pulsado una vez", pulsado)
        if (pulsado) {
            setPulsado(false)
            setListado()
        } else {
            setPulsado(true)
            setListado(<CriteriosEvaluacion ces={resultadoAprendizaje['criterios']} />)
        }
        console.log(pulsado)
    }
    return (
        <div className='resultadoAprendizaje'>
            <button id='btn_RA' className='btn_RA' onClick={expandirRA}>{resultadoAprendizaje['nombreCortoCSV']} - {resultadoAprendizaje['descripcionCSV']}</button>
            {listado}
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
    const [listado, setListado] = useState()
    function expandirCOMP() {
        console.log("Hemos pulsado una vez", pulsado)
        if (pulsado) {
            setPulsado(false)
            setListado()
        } else {
            setPulsado(true)
            setListado(<ResultadosAprendizaje ras={comp['ras']} />)
        }
        console.log(pulsado)
    }
    return (
        <div className='competencia'>
            <button id='btn_Comp' className='btn_Comp' onClick={expandirCOMP}>{comp['nombreCortoCSV']}</button>
            {listado}
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
            <div className='marco'>
                <p>{contenido['descripcionCSV']}</p>
                <b>Competencias:</b>
                <Competencias competencias={contenido['competencias']} />
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
