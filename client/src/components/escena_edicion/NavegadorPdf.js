import { useContext } from "react"
import { Marco } from "../../App"

export function NavegadorPdf() {

    const {
        currPage, setCurrPage
    } = useContext(Marco)

    function nextPage() {
        setCurrPage(currPage + 1)
    }
    function prevPage() {
        setCurrPage(currPage - 1)
    }
    return (
        <div id='navegadorPdfContainer'>
            <button onClick={prevPage} className="btn_default">Pág. anterior</button>
            <p>Página {currPage} de </p>
            <button onClick={nextPage} className="btn_default">Pág. siguiente</button>
        </div>
    )
}