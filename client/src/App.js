import './css/style.css'
import { Menu } from './components/Menu'
import { SeleccionarArchivo } from './components/escena_seleccion/SeleccionarArchivo'
import { MarcoCompetencias } from './components/escena_visualizacion/MarcoCompetencias'
import { EditarCompetencia } from './components/escena_edicion/EditarCompetencia'
import { useState, createContext, useContext } from 'react'

export const Marco = createContext();

const MarcoProvider = ({ children }) => {
  //Guarda la respuesta del servidor, es decir, el marco ya procesado
  const [contenido, setContenido] = useState(undefined)
  //La escena actual:
  // - Cargar archivo
  // - Visualizar competencias
  // - Editar competencias
  // - Exportar competencias
  const [escenaActual, setEscenaActual] = useState('SeleccionarArchivo')
  //Competencia que estamos editando
  const [competencia, setCompetencia] = useState()
  //La página a la que pertenece la competencia que estamos editando
  const [currPage, setCurrPage] = useState(0)
  //El total de páginas del archivo que estamos editando
  const [totPaginas, setTotPaginas] = useState(0)
  const [procesarActivo, setProcesarActivo] = useState(false)
  //Guarda la ruta del archivo para poder visualizarlo en edición
  const [rutaArchivo, setRutaArchivo] = useState()

  return (
    <Marco.Provider value={
      {
        contenido, setContenido,
        escenaActual, setEscenaActual,
        procesarActivo, setProcesarActivo,
        competencia, setCompetencia,
        rutaArchivo, setRutaArchivo,
        currPage, setCurrPage,
        totPaginas, setTotPaginas
      }
    }>{children}</Marco.Provider>
  )
}

function App() {


  return (
    <div id="container">
      <Menu />
      <main >
        <MarcoProvider>
          <Escena />
        </MarcoProvider>
      </main>
    </div>
  );
}

function Escena() {
  const { escenaActual } = useContext(Marco)

  let escena = <SeleccionarArchivo />

  switch (escenaActual) {
    case 'EditarCompetencia':
      escena = <EditarCompetencia />
      break
    case 'MarcoCompetencias':
      escena = <MarcoCompetencias />
      break
    case 'SeleccionarArchivo':
      escena = <SeleccionarArchivo />
      break
    default:
      escena = <SeleccionarArchivo />
      break
  }

  return (escena)
}

export default App;
