
import img_pdf from './../static/pdf_icon.png'
import img_csv from './../static/csv_icon.png'
import { not_implemented } from './../js/script.js'
import { subirArchivoPDF } from './../js/script.js'

export function SeleccionarArchivo() {
    return (
        <section id="seleccionarArchivo">
            <p>Seleccionar archivo</p>
            <article id="pdfSelector" className="panel">
                <img src={img_pdf} className="icon_128" alt="Icono archivo PDF" />
                <button id="btn_seleccionar_pdf" value="seleccionar_pdf" name="seleccionar_pdf" className="btn_subir_archivo" onClick={subirArchivoPDF}>Seleccionar archivo pdf</button>
            </article>
            <article id="csvSelector" className="panel">
                <img src={img_csv} className="icon_128" alt="Icono archivo CSV" />
                <button id="btn_seleccionar_csv" value="seleccionar_csv" name="seleccionar_csv" className="btn_subir_archivo" onClick={not_implemented}>Seleccionar archivo csv</button>
            </article>
        </section>
    )
}