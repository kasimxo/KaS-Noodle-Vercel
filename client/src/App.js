import './css/style.css'
import { Menu } from './components/Menu'
import { SeleccionarArchivo } from './components/SeleccionarArchivo';
import { MarcoCompetencias } from './components/MarcoCompetencias'

function App() {
  return (
    <div id="container">
      <Menu />
      <main >
        <SeleccionarArchivo />
        <MarcoCompetencias />
      </main>
    </div>
  );
}

export default App;
