import { Link, useLocation } from 'react-router-dom'


export function BotonVolverEscena(props) {
    //Indicamos a que escena volver
    let escena = ''
    let location = useLocation()

    switch (location.pathname) {
        case '/edit':
            escena = '/view'
            break
        case '/view':
            escena = '/select'
            break
        default:
            escena = '/'
            break
    }


    return (
        <Link to={escena} className='btn_default'>
            Volver
        </Link>
    )
}