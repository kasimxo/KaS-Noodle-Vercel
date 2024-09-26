import { Link } from "react-router-dom"

export function Error() {

    return (
        <section className="centrado">
            <div>
                <h1>Error 404, página no encontrada</h1>
                <Link to='/' >
                    <button className="btn_default" >Volver</button>
                </Link>
            </div>
        </section>
    )


}