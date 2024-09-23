import { useContext, useState } from "react"
import { Marco } from '../../pages/Layout'
import { Navigate } from "react-router-dom"

export function BotonGuardarCambios(props) {

    const { contenido, competencia, setContenido } = useContext(Marco)
    const [listo, setListo] = useState(false)

    /** Método que devuelve un "componente" (competencia, ra, ce) a partir de su correspondiente elemento html */
    //En caso de que se trate de una Comp, los ras no van incluidos
    //En caso de que se trate de un RA, los ces no van incluidos
    function formarComponente(Elemento, tipo) {

        //Recogemos el nuevo texto
        var denominacion = Elemento.querySelector('.contenido').innerText


        var componente = {
            nombre: "",
            pag: Elemento.dataset.pagina * 1,

            idPadreCSV: Elemento.dataset.idpadre,
            idCSV: Elemento.dataset.id,
            // nombreCortoCSV: nombrecorto,
            //descripcionCSV: Elemento.dataset.descripcion,
            descripcionFormatoCSV: Elemento.dataset.descripcionformato,
            valoresEscalaCSV: Elemento.dataset.valoresescala,
            configuracionEscalaCSV: Elemento.dataset.configuracionescala,
            tipoReglaCSV: Elemento.dataset.tiporegla,
            resultadoReglaCSV: Elemento.dataset.resultadoregla,
            configuracionReglaCSV: Elemento.dataset.configuracionregla,
            idReferenciasCruzadasCompetenciasCSV: Elemento.dataset.idreferenciascruzadascompetenicas,
            idExportacionCSV: Elemento.dataset.idexportacion,
            esMarcoCompetenciasCSV: Elemento.dataset.esmarcocompetencias,
            taxonomiaCSV: Elemento.dataset.taxonomia
        }


        switch (tipo) {
            case 'competencia':
                componente['nombreCortoCSV'] = denominacion
                componente['descripcionCSV'] = Elemento.dataset.descripcion
                break
            case 'ra':
                componente['nombreCortoCSV'] = Elemento.dataset.nombrecorto
                componente['descripcionCSV'] = denominacion
                break
            case 'ce':
                componente['nombreCortoCSV'] = Elemento.dataset.nombrecorto
                componente['descripcionCSV'] = denominacion
                break
            default:
                break
        }


        return componente
    }

    function guardarCambios() {

        //El nombre de la competencia que hemos modificado
        var modu = competencia['nombreCortoCSV']

        //Recojemos del DOM toda la competencia
        var newCompetenciaElement = document.querySelector('[data-tipo="competencia"]')
        var newRasElement = newCompetenciaElement.querySelectorAll('[data-tipo="ra"]')

        var newCompetencia = formarComponente(newCompetenciaElement, 'competencia')
        newCompetencia['ras'] = {}
        newRasElement.forEach((elemento) => {
            var newRa = formarComponente(elemento, 'ra')
            newRa['criterios'] = {}

            var newCesElement = elemento.querySelectorAll('[data-tipo="ce"]')

            newCesElement.forEach((ce) => {
                var newCe = formarComponente(ce, 'ce')
                newRa.criterios[newCe['descripcionCSV']] = newCe
            })

            newCompetencia.ras[newRa['nombreCortoCSV']] = newRa
        })

        //newRasElement.forEach((elemento) => formarComponente(elemento))
        contenido['competencias'][modu] = newCompetencia

        setListo(true)
    }

    return (
        <button className='btn_default'
            onClick={guardarCambios}>
            Guardar cambios
            {listo && <Navigate to={'/view'} replace={true} />}
        </button>
    )
}