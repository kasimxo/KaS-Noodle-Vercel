import { useContext, useState, memo } from "react"
import { Marco } from "../../App"
import { EscenaVisualizacion } from "./MarcoCompetencias"

import { ResultadosAprendizaje } from "./ResultadosAprendizaje"

import right_arrow from './../../static/Right_arrow_icon.png'
import down_arrow from './../../static/Down_arrow_icon.png'
import editar_icon from './../../static/editar_icon.png'

export function Competencias(props) {
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


function Competencia(props) {
    let comp = props.valor
    const { setEscenaActual, setCompetencia, setCurrPage } = useContext(Marco)
    const {
        competenciasSeleccionadasNum, setCompetenciasSeleccionadasNum,
        competenciasSeleccionadas, setCompetenciasSeleccionadas
    } = useContext(EscenaVisualizacion)
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

    function editarCOMP() {
        var c = props.valor
        setCompetencia(c)
        setCurrPage(c['pag'])
        setEscenaActual('EditarCompetencia')
    }

    const calcularSeleccionadas = (event) => {

        //Primero actualizamos el indicador de competencias seleccionadas
        let seleccionadas = document.querySelectorAll('input[type="checkbox"]:checked')
        setCompetenciasSeleccionadasNum(seleccionadas.length)

        //Ahora añadimos o quitamos la competencia a la colección
        let competenciaClicada = event.target.closest('[data-tipo="competencia"]')
        let id = competenciaClicada.dataset.id

        console.log()
        if (event.target.checked && !competenciasSeleccionadas.hasOwnProperty(id)) {
            //ponerlo
            competenciasSeleccionadas[id] = competenciaClicada
        } else if (competenciasSeleccionadas.hasOwnProperty(id)) {
            //quitarlo
            delete competenciasSeleccionadas[id]
        }
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
            data-pagina={comp['pag']}
        >
            <div className='contenedor_botones'>
                <div>
                    <input type='checkbox' onChange={calcularSeleccionadas} />
                    <button id='btn_Comp' className='btn_Comp' onClick={expandirCOMP}>{icon} {comp['nombreCortoCSV']}</button>
                </div>
                <button id='btn_editar' className='btn_default' onClick={editarCOMP}>
                    <img src={editar_icon} className='icon_16' alt='Icono de edición' title='Pulsa para editar la competencia' /> &nbsp;editar
                </button>
            </div>
            <Ras ras={comp['ras']} pulsado={pulsado} />
        </div>
    )
}

const Ras = memo(function Ras(props) {
    let pulsado = props.pulsado
    let ras = props.ras
    return (
        <div className={pulsado ? 'ancho' : 'invisible'}>
            <ResultadosAprendizaje ras={ras} />
        </div>
    )
})
