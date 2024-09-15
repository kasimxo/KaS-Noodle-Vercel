import { useContext } from "react"
import { EscenaVisualizacion } from "./MarcoCompetencias"

export function BotonesSeleccion() {

    let { competenciasSeleccionadas, setCompetenciasSeleccionadas } = useContext(EscenaVisualizacion)

    function seleccionarTodo() {
        var selectores = document.querySelectorAll('input[type="checkbox"]')
        selectores.forEach((element) => {
            element.checked = true
        })
        setCompetenciasSeleccionadas(selectores.length)
    }

    function limpiarSeleccion() {
        var selectores = document.querySelectorAll('input[type="checkbox"]')
        selectores.forEach((element) => {
            element.checked = false
        })
        setCompetenciasSeleccionadas(0)
    }

    return (
        <div>
            <button className="btn_default" onClick={seleccionarTodo}>Seleccionar todo</button>
            <button className="btn_default" onClick={limpiarSeleccion}>Limpiar selección</button>
        </div>
    )
}