import './../css/style.css'
import logo from './../static/NoodleLogotipoExtended_Inv720.png'

export function Menu() {
    return (
        <div id="menu">
            <img src={logo} id="logo_ext" alt="Logo de Noodle" />
        </div>
    )
}