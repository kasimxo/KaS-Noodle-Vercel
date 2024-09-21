import { useContext } from "react"
import { EscenaVisualizacion } from "./MarcoCompetencias"

export function BotonesSeleccion() {

    let {
        competenciasSeleccionadasNum, setCompetenciasSeleccionadasNum,
        competenciasSeleccionadas, setCompetenciasSeleccionadas
    } = useContext(EscenaVisualizacion)

    function seleccionarTodo() {
        var selectores = document.querySelectorAll('input[type="checkbox"]')

        selectores.forEach((element) => {
            element.checked = true
            let competenciaClicada = element.closest('[data-tipo="competencia"]')
            let id = competenciaClicada.dataset.id

            if (!competenciasSeleccionadas.hasOwnProperty(id)) {
                competenciasSeleccionadas[id] = competenciaClicada
            }
        })
        setCompetenciasSeleccionadasNum(selectores.length)
    }

    function limpiarSeleccion() {
        var selectores = document.querySelectorAll('input[type="checkbox"]')
        selectores.forEach((element) => {
            element.checked = false
        })
        Object.keys(competenciasSeleccionadas).forEach(key => {
            delete competenciasSeleccionadas[key]
        })
        setCompetenciasSeleccionadasNum(0)
    }

    return (
        <div className='contenedor_botones_seleccion'>
            <IndicadorCompetenciasSeleccionadas />
            <button className="btn_default" onClick={seleccionarTodo}>Seleccionar todo</button>
            <button className="btn_default" onClick={limpiarSeleccion}>Limpiar selección</button>
        </div>
    )
}


function IndicadorCompetenciasSeleccionadas() {
    let { competenciasSeleccionadasNum } = useContext(EscenaVisualizacion)
    return (
        <b>Competencias: {competenciasSeleccionadasNum} competencias seleccionadas</b>
    )
}