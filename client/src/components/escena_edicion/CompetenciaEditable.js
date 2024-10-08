import { useState, useContext } from "react"
import { Marco } from '../../pages/Layout'
import { ResultadosAprendizajeEditable } from "./ResultadosAprendizajeEditable"
import { TextoEditable } from "./TextoEditable"

export function CompetenciaEditable(props) {
    let comp = props.valor
    const { setEscenaActual, setCompetencia, setCurrPage } = useContext(Marco)
    const [pulsado, setPulsado] = useState(false)

    return (
        <div className='competenciaEditable'
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
                <TextoEditable texto={comp['nombreCortoCSV']} id={comp['idCSV']} clases={'btn_Comp_Editable'} />
            </div>
            <ResultadosAprendizajeEditable ras={comp['ras']} />
        </div>
    )
}
/**
                 */