export function Help() {

    return (
        <section className="pantalla_ayuda">
            <div>
                <h4>Primeros pasos con Noodle</h4>
                <ol>
                    <li><a href="#Importar" alt='Importar'>Importar un marco de competencias</a></li>
                    <li><a href="#Ver" alt='Ver'>Ver el marco de competencias</a></li>
                    <li><a href="#Editar" alt='Editar'>Editar competencias</a></li>
                    <li><a href="#Exportar" alt='Exprtar'>Exportar competencias</a></li>
                </ol>
            </div>
            <div id='Importar'>
                <h5>Importar un marco de competencias</h5>
                <p>Para comenzar a utilizar Noodle, selecciona el tipo de archivo (PDF, CSV) que quieres transformar en un marco de competencias</p>
                <p>Si el archivo seleccionado es PDF, deberá seleccionar también el modelo de boletín oficial correspondiente.</p>
                <p>Pulse el botón de Procesar. El procesamiento y generación del marco de competencias comenzará de forma automática</p>
            </div>
            <div id='Ver'>
                <h5>Ver el marco de competencias</h5>
                <p>
                    En la pantalla de Visualización podrá ver el marco de competencias generado. <br /> Para ver el detalle de una competencia
                    (sus resultados de aprendizaje y criterios de evaluación) basta con hacer clic en el nombre de dicha competencia.
                </p>
            </div>
            <div id='Editar'>
                <h5>Editar competencias</h5>
                <p>
                    Si al visualizar el marco de competencias ha visto algún tipo de error, o desea modificar algún aspecto del marco de competencias,
                    puede hacerlo pulsando el botón de Editar en la competencia correspondiente.
                </p>
                <p>
                    En la pantalla de edición puede modificar cualquier aspecto de la competencia haciendo clic sobre su denominación.
                </p>
                <p>
                    Antes de salir, debe guardar cambios.
                </p>
            </div>
            <div id='Exportar'>
                <h5>Exportar competencias</h5>
                <p>
                    Desde la pantalla de Visualización podrá seleccionar aquellas competencias que desee exportar.
                </p>
                <p>
                    También puede utilizar los botones de selección rápida para seleccionar todo el marco decompetencias o borrar la selección.
                </p>
                <p>
                    Por último, pulse el botón Exportar. La descarga comenzará de forma automática. El archivo CSV con el marco de competencias generado se guardará en la carpeta de descargas de su dispositivo.
                </p>
            </div>
        </section >
    )
}