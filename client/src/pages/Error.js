import { Link } from "react-router-dom"

export function Error() {

    return (
        <div>
            <h1>Error 404, página no encontrada</h1>
            <Link to='/' >Volver</Link>
        </div>
    )


}