import './App.css'
import './css/style.css'
import logo from './static/NoodleLogotipoExtended_Inv720.png'
import img_pdf from './static/pdf_icon.png'
import img_csv from './static/csv_icon.png'

function App() {
  return (
    <div>
      <div id="menu">
        <img src={logo} id="logo_ext" alt="Logo de Noodle" />
      </div>
      <main >
        <section id="seleccionarArchivo">
          <article id="pdfSelector" class="panel">
            <img src={img_pdf} class="icon_128" alt="Icono archivo PDF" />
            <button id="btn_seleccionar_pdf" value="seleccionar_pdf" name="seleccionar_pdf" class="btn_subir_archivo" onclick="subirArchivoPDF()">Seleccionar archivo pdf</button>
          </article>
          <article id="csvSelector" class="panel">
            <img src={img_csv} class="icon_128" alt="Icono archivo CSV" />
            <button id="btn_seleccionar_csv" value="seleccionar_csv" name="seleccionar_csv" class="btn_subir_archivo" onclick="not_implemented()">Seleccionar archivo csv</button>
          </article>
        </section>
      </main>
      <script src="js/script.js"></script>
    </div>
  );
}

export default App;
