
import img_pdf from './../static/pdf_icon.png'
import img_csv from './../static/csv_icon.png'
import { not_implemented } from './../js/script.js'
import { subirArchivoPDF, enviarArchivo, textoArchivo } from './../js/script.js'
import { useContext, useState } from 'react'
import { Marco } from './../App.js'
import { BotonProcesarArchivo } from './BotonProcesarArchivo.js'




export function SeleccionarArchivo() {


    const { setContenido } = useContext(Marco)
    const [isDisabled, setDisabled] = useState(true)


    async function handle() {
        await subirArchivoPDF()
    }

    async function ProcesarPDF() {
        console.log('Hemos pulsado procesar pdf')
        let texto = await enviarArchivo()
        setContenido(texto)
    }

    function checkButtonDisabled() {
        if ((document.getElementById('tipo_archivo').value !== 'NA') && (textoArchivo != null) && (textoArchivo !== '')) {
            setDisabled(false)
        }
    }

    return (
        <section>
            <article id="archivoTipo">
                <form action='#'>
                    <label >Tipo de documento
                        <select name='tipos' id='tipo_archivo' onChange={checkButtonDisabled}>
                            <option value='NA'>-</option>
                            <option value='BOE'>Boletín Oficial del Estado (BOE)</option>
                            <option value='BOJA'>Boletín Oficial de la junta de Andalucía (BOJA)</option>
                            <option value='BOA'>Boletín Oficial de Aragón (BOA)</option>
                            <option value='BOPA'>Boletín Oficial del Principado de Asturias (BOPA)</option>
                            <option value='BOIB'>Boletín Oficial de las Islas Baleares (BOIB)</option>
                            <option value='BOC'>Boletín Oficial de Canarias (BOC)</option>
                            <option value='BOCA'>Boletín Oficial de Cantabria (BOC)</option>
                            <option value='DOCM'>Diario Oficial de Castilla-La Mancha (DOCM)</option>
                            <option value='BOCYL'>Boletín Oficial de Castilla y León (BOCYL)</option>
                            <option value='DOGC'>Diari Oficial de la Generalitat de Catalunya (DOGC)</option>
                            <option value='DOE'>Diario Oficial de Extremadura (DOE)</option>
                            <option value='DOG'>Diario Oficial de Galicia (DOG)</option>
                            <option value='BOR'>Boletín Oficial de la Rioja (BOR)</option>
                            <option value='BOCM'>Boletín Oficial de la Comunidad de Madrid (BOCM)</option>
                            <option value='BORM'>Boletín Oficial de la Región de Murcia (BORM)</option>
                            <option value='BON'>Boletín Oficial de Navarra (BON)</option>
                            <option value='BOPV'>Boletín Oficial del País Vasco (BOPV)</option>
                            <option value='DOGV'>Diari Oficial de la Generalitat Valenciana (DOGV)</option>
                            <option value='BOCCE'>Boletín Oficial de la Ciudad Autónoma de Ceuta (BOCCE)</option>
                            <option value='BOME'>Boletín Oficial de la Ciudad Autónoma de Melilla (BOME)</option>
                        </select>
                    </label>
                </form>
            </article>
            <article id="seleccionarArchivo">
                <p>Seleccionar archivo</p>
                <div id="pdfSelector" className="panel">
                    <img src={img_pdf} className="icon_128" alt="Icono archivo PDF" />
                    <button id="btn_seleccionar_pdf" value="seleccionar_pdf" name="seleccionar_pdf" className="btn_subir_archivo" onClick={handle}>Seleccionar archivo pdf</button>
                </div>
                <div id="csvSelector" className="panel" >
                    <img src={img_csv} className="icon_128" alt="Icono archivo CSV" />
                    <button id="btn_seleccionar_csv" value="seleccionar_csv" name="seleccionar_csv" className="btn_subir_archivo" onClick={not_implemented}>Seleccionar archivo csv</button>
                </div>
            </article>
            <div className='break' />
            <BotonProcesarArchivo buttonDisabled={isDisabled} />
        </section>
    )
}