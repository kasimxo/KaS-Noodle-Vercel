export function BotonExportar() {
    /// añade al texto las propiedades del objeto tal y como pide Moodle
    function concatenar(texto, objetos) {

        objetos.forEach(objeto => {

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
        })
        return texto
    }
    function exportar() {
        var texto = ''
        var marcos = document.querySelectorAll('[data-tipo="marco"]')
        var competencias = document.querySelectorAll('[data-tipo="competencia"]')
        var ras = document.querySelectorAll('[data-tipo="ra"]')
        var ces = document.querySelectorAll('[data-tipo="ce"]')
        texto = concatenar(texto, marcos)
        texto = concatenar(texto, competencias)
        texto = concatenar(texto, ras)
        texto = concatenar(texto, ces)

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
        } else {
            document.getElementById('downloadlink').href = textFile
        }

        console.log(texto)
    }
    return (
        <div>
            <button id="btn_exportar" value="exportar_btn" name="exportar_btn" className="btn_exportar" onClick={exportar}>
                Exportar
            </button>
        </div>
    )
}