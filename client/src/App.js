import './css/style.css'
import { Menu } from './components/Menu'
import { SeleccionarArchivo } from './components/SeleccionarArchivo'
import { MarcoCompetencias } from './components/MarcoCompetencias'
import { EditarCompetencia } from './components/EditarCompetencia'
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
        rutaArchivo, setRutaArchivo
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
          <SeleccionarArchivo />
          <MarcoCompetencias />
          <EditarCompetencia />
        </MarcoProvider>
      </main>
    </div>
  );
}

export default App;
