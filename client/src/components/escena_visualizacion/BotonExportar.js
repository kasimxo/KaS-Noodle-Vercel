import { useContext } from "react"
import { EscenaVisualizacion } from "./MarcoCompetencias"

export function BotonExportar() {

    let { competenciasSeleccionadas, setCompetenciasSeleccionadas } = useContext(EscenaVisualizacion)

    /// añade al texto las propiedades del objeto tal y como pide Moodle
    function concatenar(texto, objeto) {
        console.log(objeto)
        var linea = ''
        linea += '"' + objeto.dataset.idpadre + '","'
            + objeto.dataset.id + '","'
            + objeto.dataset.nombrecorto + '","'
            + objeto.dataset.descripcion + '","'
            + objeto.dataset.descripcionformato + '","'
            + objeto.dataset.valoresescala + '","'
            + objeto.dataset.configuracionescala + '","'
            + objeto.dataset.tiporegla + '","'
            + objeto.dataset.resultadoregla + '","'
            + objeto.dataset.configuracionregla + '","'
            + objeto.dataset.idreferenciascruzadascompetencias + '","'
            + objeto.dataset.idexportacion + '","'
            + objeto.dataset.esmarcocompetencias + '","'
            + objeto.dataset.taxonomia + '"\n'
        texto += linea

        return texto
    }
    function exportar() {
        if (Object.keys(competenciasSeleccionadas).length < 1) {
            alert('No hay ninguna competencia seleccionada, por favor, selecciona las competencias que desees exportar.')
            return
        }

        var cabeceras = '"Identificador padre","Identificador","Nombre corto","Descripción","Descripción del formato","Valores de escala","Configuración de escala","Tipo de regla (opcional)","Resultado de la regla (opcional)","Configuración de regla (opcional)","Identificadores de referencias cruzadas de competencias","Identificador de la exportación (opcional)","Es marco de competencias","Taxonomía"\n'
        var texto = '' + cabeceras
        var marcos = document.querySelectorAll('[data-tipo="marco"]')

        marcos.forEach((marco) => { texto = concatenar(texto, marco) })

        Object.keys(competenciasSeleccionadas).forEach((key) => { texto = concatenar(texto, competenciasSeleccionadas[key]) })

        Object.keys(competenciasSeleccionadas).forEach((key) => {
            var resultados = competenciasSeleccionadas[key].querySelectorAll('[data-tipo="ra"]')
            resultados.forEach((el) => {
                texto = concatenar(texto, el)
                var criterios = el.querySelectorAll('[data-tipo="ce"]')
                criterios.forEach((ce) => { texto = concatenar(texto, ce) })
            })
        })

        var textFile = null
        var data = new Blob([texto], { type: 'text/plain' });

        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (textFile !== null) {
            window.URL.revokeObjectURL(textFile);
        }

        textFile = window.URL.createObjectURL(data);


        if (document.getElementById('downloadlink') == null) {
            var enlace = document.createElement('a')
            enlace.setAttribute('download', 'marco.csv')
            enlace.setAttribute('id', 'downloadlink')
            enlace.setAttribute('style', 'display:block')
            enlace.setAttribute('href', textFile)
            enlace.innerHTML = 'La descarga debería iniciarse automáticamente, si pasados unos segundos no ha comenzado, pincha aquí'
            document.getElementById('btn_exportar').after(enlace)

            document.getElementById('downloadlink').click()
        } else {
            //Esto es en el caso de que ya estuviera creado el elemento
            document.getElementById('downloadlink').href = textFile
            document.getElementById('downloadlink').click()
        }

    }
    return (

        <button id="btn_exportar" value="exportar_btn" name="exportar_btn" className="btn_default" onClick={exportar}>
            Exportar
        </button>

    )
}