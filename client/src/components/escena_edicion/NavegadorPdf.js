import { useContext, useState } from "react"
import { Marco } from "../../App"

export function NavegadorPdf(props) {

    const {
        currPage, setCurrPage,
        totPaginas
    } = useContext(Marco)

    const [ultimaPagina, setUltimaPagina] = useState(false)
    const [primeraPagina, setPrimeraPagina] = useState(false)

    function nextPage() {
        setCurrPage(currPage + 1)
        if (currPage === (totPaginas - 1)) {
            setUltimaPagina(true)
        } else {
            setUltimaPagina(false)
        }
        setPrimeraPagina(false)
    }
    function prevPage() {
        setCurrPage(currPage - 1)
        //console.log('Total: ' + totPaginas + '\nCurr: ' + currPage)
        if (currPage === 2) {
            setPrimeraPagina(true)
        } else {
            setPrimeraPagina(false)
        }
        setUltimaPagina(false)
    }

    if (currPage === 2) {
        setPrimeraPagina(true)
    } else if (currPage === (totPaginas - 1)) {
        setUltimaPagina(true)
    }

    return (
        <div id='navegadorPdfContainer'>
            <button onClick={prevPage} className="btn_default" disabled={primeraPagina}>Pág. anterior</button>
            <p>Página {currPage} de {totPaginas}</p>
            <button onClick={nextPage} className="btn_default" disabled={ultimaPagina}>Pág. siguiente</button>
        </div>
    )
}