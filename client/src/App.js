import './css/style.css'
import { Menu } from './components/Menu'
import { SeleccionarArchivo } from './components/SeleccionarArchivo'
import { MarcoCompetencias } from './components/MarcoCompetencias'
import { useState, createContext, useContext } from 'react'

export const Marco = createContext();

const MarcoProvider = ({ children }) => {
  const [contenido, setContenido] = useState(undefined)
  const [escenaActual, setEscenaActual] = useState('SeleccionarArchivo')
  const [procesarActivo, setProcesarActivo] = useState(false)

  return (
    <Marco.Provider value={
      {
        contenido, setContenido,
        escenaActual, setEscenaActual,
        procesarActivo, setProcesarActivo
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
        </MarcoProvider>
      </main>
    </div>
  );
}

export default App;
