import './css/style.css'
import { Menu } from './components/Menu'
import { SeleccionarArchivo } from './components/SeleccionarArchivo';
import { MarcoCompetencias } from './components/MarcoCompetencias'
import { useState, createContext } from 'react'

export const Marco = createContext();

const MarcoProvider = ({ children }) => {
  const [contenido, setContenido] = useState(undefined)

  return (
    <Marco.Provider value={{ contenido, setContenido }}>{children}</Marco.Provider>
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
