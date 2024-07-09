import { useContext } from 'react'
import { Marco } from './../App'

export function MarcoCompetencias(texto) {

    let { contenido } = useContext(Marco)

    return (
        <div>
            <p>Marco de competencias</p>
            <p>Prueba: {contenido}</p>
        </div>
    )
}
