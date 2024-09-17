import { useContext, useState } from "react"
import { Marco } from "../../App"
import { CompetenciaEditable } from "./CompetenciaEditable";
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css';

import { pdfjs, Document, Page } from 'react-pdf'

import { BotonVolverEscena } from '../BotonVolverEscena'
import { BotonGuardarCambios } from './BotonGuardarCambios'
import { NavegadorPdf } from "./NavegadorPdf"

import right_arrow from './../../static/Right_arrow_icon.png'
import left_arrow from './../../static/Left_arrow_icon.png'
import down_arrow from './../../static/Down_arrow_icon.png'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();
/*
const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};
*/
const options = {}


export function EditarCompetencia() {


    const { escenaActual, setEscenaActual,
        competencia, setCompetencia,
        rutaArchivo,
        currPage, setCurrPage,
        totPaginas, setTotPaginas
    } = useContext(Marco)

    const [numPages, setNumPages] = useState();
    const [containerRef, setContainerRef] = useState(null);
    const [containerWidth, setContainerWidth] = useState();
    const [pdfShown, setPdfShown] = useState(false)

    //if ((rutaArchivo === undefined) || (rutaArchivo === '')) { setPdfShown(false) }

    var competencia_node
    if (competencia !== undefined) {
        competencia_node = <CompetenciaEditable valor={competencia} />
    } else {
        competencia_node = ''
    }

    function onDocumentLoadSuccess({ numPages: nextNumPages }) {
        setNumPages(nextNumPages);
        setTotPaginas(nextNumPages)
    }

    function mostrarPdf() {
        if (pdfShown) {
            setPdfShown(false)
        } else {
            setPdfShown(true)
        }
    }

    return (
        <section id='editarCompetencia' className={escenaActual === 'EditarCompetencia' ? '' : 'invisible'}>
            <article id='visualizador_pdf' className={pdfShown ? "visualizador_pdf visible" : "invisible"} >
                <NavegadorPdf numPages={numPages} />
                <div className="boxShadow">
                    <Document file={rutaArchivo} onLoadSuccess={onDocumentLoadSuccess} onLoadError={(error) => alert('Error while loading document! ' + error.message)}>
                        <Page
                            pageNumber={currPage}
                            scale={1}
                            error={typeof currPage}
                        />
                    </Document>
                </div>
            </article>

            <button onClick={mostrarPdf} className="btn_transparente">
                <img src={pdfShown ? left_arrow : right_arrow} alt='Mostrar pdf origen' title="Mostrar/ocultar pdf origen" className="icon_32"></img>
            </button>
            {competencia_node}

            <article className='contenedor_botones'>
                <BotonVolverEscena escena='MarcoCompetencias' />
                <BotonGuardarCambios />
            </article>
        </section>
    )
}



