import { useContext } from "react"
import { Marco } from "../../App"

export function BotonGuardarCambios() {

    const { setContenido, setEscenaActual } = useContext(Marco)

    function guardarCambios() {
        setEscenaActual('MarcoCompetencias')
    }
    return (
        <button className='btn_default'
            onClick={guardarCambios}>
            Guardar cambios
        </button>
    )
}