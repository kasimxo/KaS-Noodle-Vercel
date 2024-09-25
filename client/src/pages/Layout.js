
import { Menu } from './../components/Menu'
import { useState, createContext } from 'react'
import { Outlet } from 'react-router-dom'

export function Layout() {

    return (
        <div id="container">
            <Menu />
            <MarcoProvider>
                <Outlet />
            </MarcoProvider>
        </div>
    );

}


export const Marco = createContext();

const MarcoProvider = ({ children }) => {
    //Guarda la respuesta del servidor, es decir, el marco ya procesado
    const [contenido, setContenido] = useState(undefined)
    //Competencia que estamos editando
    const [competencia, setCompetencia] = useState()
    //La página a la que pertenece la competencia que estamos editando
    const [currPage, setCurrPage] = useState(0)
    //El total de páginas del archivo que estamos editando
    const [totPaginas, setTotPaginas] = useState(0)
    const [procesarActivo, setProcesarActivo] = useState(false)
    //Guarda la ruta del archivo para poder visualizarlo en edición
    const [rutaArchivo, setRutaArchivo] = useState()
    //Si es un archivo PDF o CSV
    const [tipoArchivo, setTipoArchivo] = useState()

    return (
        <Marco.Provider value={
            {
                contenido, setContenido,
                procesarActivo, setProcesarActivo,
                competencia, setCompetencia,
                rutaArchivo, setRutaArchivo,
                currPage, setCurrPage,
                totPaginas, setTotPaginas,
                tipoArchivo, setTipoArchivo
            }
        }>{children}</Marco.Provider>
    )
}
