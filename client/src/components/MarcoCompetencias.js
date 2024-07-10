import { useContext } from 'react'
import { Marco } from './../App'

function Competencia(props) {
    console.log(props.valor)
    let comp = props.valor
    return (
        <div class='competencia'>
            <p>{comp['nombreCortoCSV']}</p>
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
        <div class='competencias'>
            {coleccion}
        </div>
    )
}

export function MarcoCompetencias(texto) {

    let { contenido } = useContext(Marco)
    if (contenido !== undefined) {
        return (
            <div class='marco'>
                <p>{contenido['descripcionCSV']}</p>
                <p>Competencias:</p>
                <Competencias competencias={contenido['competencias']} />
            </div>
        )
    } else {
        return (
            <div class='marco'>
                <p>Marco de competencias: Todavía no has cargado un marco de competencias</p>
            </div>
        )
    }
}
