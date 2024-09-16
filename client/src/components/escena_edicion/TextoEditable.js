import { useState } from "react"

export function TextoEditable(props) {
    var texto = props.texto + props.id
    let id = props.id
    let clases = props.clases + ' visible'

    //Variable que controla si estamos editando o no
    const [editando, setEditando] = useState(false)

    function editar() {
        let inputText = document.querySelector('#' + id + '_input')
        let originalText = document.querySelector('#' + id + '_btn_Comp')
        inputText.value = originalText.innerHTML
        setEditando(true)
        console.log('hemos disparado editar')
    }

    function guardarCambios() {
        let inputText = document.querySelector('#' + id + '_input')
        let originalText = document.querySelector('#' + id + '_btn_Comp')

        originalText.innerHTML = inputText.value
        setEditando(false)

        console.log('hemos disparado guardar cambios')
    }

    function cancelarCambios() {
        setEditando(false)
        console.log('hemos disparado cancelar cambios')
    }


    return (
        <div className="contenedor_componentes_editables">
            <textarea id={id + '_input'}
                type="text"
                rows={5}
                className={editando ? 'visible ancho' : 'invisible'} ></textarea>
            <div className="contenedor_botones">

                <button id='btn_CancelarCambios' onClick={cancelarCambios} className={editando ? 'btn_default visible' : 'invisible'}>Cancelar</button>
                <button id='btn_GuardarCambios' onClick={guardarCambios} className={editando ? 'btn_default visible' : 'invisible'}>Guardar</button>
            </div>
            <button id={id + '_btn_Comp'} onClick={editar} className={editando ? 'invisible' : clases}> {texto}</button >
        </div>
    )
}