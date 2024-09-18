
import { not_implemented } from '../../js/script.js'
import { SubirArchivoPDF, enviarArchivo, textoArchivo } from '../../js/script.js'
import { useContext, useState } from 'react'
import { Marco } from '../../App.js'
import { BotonProcesarArchivo } from './BotonProcesarArchivo.js'

import img_pdf from './../../static/pdf_icon.png'
import img_csv from './../../static/csv_icon.png'
import img_cancelar from './../../static/Cancelar_icono.png'

export function SeleccionarArchivo(props) {

    const {
        escenaActual, setProcesarActivo,
        setRutaArchivo,
        tipoArchivo, setTipoArchivo
    } = useContext(Marco)

    async function handle() {
        let respuesta = await SubirArchivoPDF()
        setRutaArchivo(respuesta)
        setTipoArchivo('pdf')
        checkButtonDisabled()
    }

    function checkButtonDisabled() {
        if ((document.getElementById('tipo_archivo').value !== 'NA') && (textoArchivo != null) && (textoArchivo !== '')) {
            setProcesarActivo(true)
        }
    }


    return (
        <section className={escenaActual === 'SeleccionarArchivo' ? '' : 'invisible'}>
            <article id="seleccionarArchivo">
                <div className='ancho'>
                    <p>Seleccionar archivo</p>

                </div>
                <div id="pdfSelector" className='panel_horizontal'>
                    <div className='flex_vertical'>
                        <img src={img_pdf} className="icon_128" alt="Icono archivo PDF" />
                        <p id='file_name_PDF' className='invisible texto_3'></p>
                        <button id="btn_seleccionar_pdf" value="seleccionar_pdf" name="seleccionar_pdf" className="btn_subir_archivo" onClick={handle}>Seleccionar archivo PDF</button>
                    </div>
                    <TipoArchivo />
                    <BotonQuitarArchivo />
                </div>
                <div id="csvSelector" className={tipoArchivo === 'pdf' ? 'invisible' : "panel"} >
                    <img src={img_csv} className="icon_128" alt="Icono archivo CSV" />
                    <button id="btn_seleccionar_csv" value="seleccionar_csv" name="seleccionar_csv" className="btn_subir_archivo" onClick={not_implemented}>Seleccionar archivo CSV</button>
                    <p id='file_name_CSV'></p>
                </div>
            </article>
            <div className='break' />
            <BotonProcesarArchivo />
        </section>
    )
}

function BotonQuitarArchivo() {

    const {
        escenaActual, setProcesarActivo,
        setRutaArchivo,
        tipoArchivo, setTipoArchivo
    } = useContext(Marco)

    function quitarArchivo() {

        if (tipoArchivo === 'pdf') {
            var textEl = document.querySelector('#file_name_PDF')
            textEl.textContent = ''
            textEl.classList.replace('visible', 'invisible')
        }

        setProcesarActivo(false)
        setRutaArchivo()
        setTipoArchivo()
    }
    return (
        <button onClick={quitarArchivo} className={tipoArchivo === 'pdf' ? 'btn_cancelar' : 'invisible'} >
            <img src={img_cancelar} className='icon_16' alt='Cancelar' title='Cancelar' />
        </button>
    )
}

function TipoArchivo() {
    const {
        setProcesarActivo, rutaArchivo
    } = useContext(Marco)

    function checkButtonDisabled() {
        if ((document.getElementById('tipo_archivo').value !== 'NA') && (textoArchivo != null) && (textoArchivo !== '')) {
            setProcesarActivo(true)
        } else {
            setProcesarActivo(false)
        }
    }
    return (
        <article id="archivoTipo" className={rutaArchivo === undefined ? 'invisible' : 'visible'}>
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
    )
}

