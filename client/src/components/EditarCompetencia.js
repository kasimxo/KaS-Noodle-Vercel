import { useContext, useState } from "react"
import { Marco } from "../App"

import { pdfjs, Document, Page } from 'react-pdf'


import { BotonVolverEscena } from './BotonVolverEscena'
import { BotonGuardarCambios } from './BotonGuardarCambios'

import right_arrow from './../static/Right_arrow_icon.png'
import down_arrow from './../static/Down_arrow_icon.png'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};


export function EditarCompetencia() {

    const [numPages, setNumPages] = useState();
    const [containerRef, setContainerRef] = useState(null);
    const [containerWidth, setContainerWidth] = useState();
    const [currPage, setCurrPage] = useState(1)

    const maxWidth = document.getElementById('visualizador_pdf').width

    const { escenaActual, setEscenaActual,
        competencia, setCompetencia,
        rutaArchivo
    } = useContext(Marco)

    var competencia_node
    if (competencia !== undefined) {
        competencia_node = <Competencia valor={competencia} />
    } else {
        competencia_node = ''
    }

    function onDocumentLoadSuccess({ numPages: nextNumPages }) {
        setNumPages(nextNumPages);
    }

    function nextPage() {
        setCurrPage(currPage + 1)
    }

    return (
        <section id='editarCompetencia' className={escenaActual === 'EditarCompetencia' ? '' : 'invisible'}>
            <article id='visualizador_pdf' className="visualizador_pdf">
                {/* Boton para avanzar pag*/}
                <button onClick={nextPage}>1/50</button>
                <Document file={rutaArchivo} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                    <Page
                        key={`page_${currPage}`}
                        pageNumber={currPage}
                        width={maxWidth}
                    />
                </Document>
                <iframe className="visualizador_pdf invisible"
                    src={rutaArchivo}
                    title='PDF original'>
                </iframe>
            </article>
            <article id='competenciaEditando'>
                {competencia_node}
            </article>
            <article className='contenedor_botones'>
                <BotonVolverEscena escena='MarcoCompetencias' />
                <BotonGuardarCambios />
            </article>
        </section>
    )
}





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
    const { setEscenaActual, setCompetencia } = useContext(Marco)
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
        setCompetencia(props.valor)
        setEscenaActual('EditarCompetencia')
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
            <div className='contenedor_botones'>
                <button id='btn_Comp' className='btn_Comp' onClick={expandirCOMP}>{icon} {comp['nombreCortoCSV']}</button>
            </div>
            <div className={pulsado ? 'ancho' : 'invisible'}>
                <ResultadosAprendizaje ras={comp['ras']} />
            </div>
        </div>
    )
}