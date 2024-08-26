export function BotonExportar() {
    /// añade al texto las propiedades del objeto tal y como pide Moodle
    function concatenar(texto, objetos) {

        texto += objetos.forEach(objeto => {

            var linea = ''
            linea += objeto.dataset.idpadre
            return linea
        })
        return texto
    }
    function exportar() {
        var texto = ''
        var marcos = document.querySelectorAll('[data-tipo="marco"]')

        var competencias = document.querySelectorAll('[data-tipo="competencia"]')
        var ras = document.querySelectorAll('[data-tipo="ra"]')
        console.log(ras)
        var ces = document.querySelectorAll('[data-tipo="ce"]')
        texto = concatenar(texto, marcos)
        texto = concatenar(texto, competencias)
        texto = concatenar(texto, ras)
        texto = concatenar(texto, ces)

        console.log(texto)
    }
    return (
        <button id="btn_exportar" value="exportar_btn" name="exportar_btn" className="btn_exportar" onClick={exportar}>
            Exportar
        </button>
    )
}