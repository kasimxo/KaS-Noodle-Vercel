import { useContext, useState } from "react"
import { Marco } from "../../App"
import { CompetenciaEditable } from "./CompetenciaEditable";
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css';

import { pdfjs, Document, Page } from 'react-pdf'

import { BotonVolverEscena } from '../BotonVolverEscena'
import { BotonGuardarCambios } from '../BotonGuardarCambios'
import { NavegadorPdf } from "./NavegadorPdf"

import right_arrow from './../../static/Right_arrow_icon.png'
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


    return (
        <section id='editarCompetencia' className={escenaActual === 'EditarCompetencia' ? '' : 'invisible'}>
            <article id='visualizador_pdf' className="visualizador_pdf">
                <NavegadorPdf numPages={numPages} />
                <Document file={rutaArchivo} onLoadSuccess={onDocumentLoadSuccess} >
                    <Page
                        pageNumber={currPage}
                        scale={1}
                    />
                </Document>
            </article>
            {competencia_node}

            <article className='contenedor_botones'>
                <BotonVolverEscena escena='MarcoCompetencias' />
                <BotonGuardarCambios />
            </article>
        </section>
    )
}



