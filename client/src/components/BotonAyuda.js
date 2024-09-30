import { Link } from "react-router-dom";

export function BotonAyuda() {
    return (
        <Link to='/help'>
            <button className="btn_ayuda" alt='Ayuda' title='Ayuda'>?</button>
        </Link>
    )
}