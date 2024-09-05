import { useContext } from "react"
import { Marco } from "../App"
import { Competencia } from "./MarcoCompetencias"

export function EditarCompetencia() {
    const { escenaActual, setEscenaActual, competencia, setCompetencia } = useContext(Marco)
    var competencia_node
    if (competencia !== undefined) {
        competencia_node = <Competencia valor={competencia} />
    } else {
        competencia_node = ''
    }


    return (
        <section id='editarCompetencia' className={escenaActual === 'EditarCompetencia' ? '' : 'invisible'}>
            <article id='competenciaEditando'>
                {competencia_node}
            </article>
            <article id='visualizador_pdf' className="visualizador_pdf">
                <iframe className="visualizador_pdf"
                    src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf"
                    title='PDF original'>
                </iframe>
            </article>
        </section>
    )
}