import fs from 'node:fs'
import pdf from 'pdf-parse'
//import { pdf } from './../pdf-parse-improved'
import { MarcoCompetenciasDTO } from './MarcoCompetenciasDTO.js'
import { CompetenciaDTO } from './CompetenciasDTO.js'
import { ResultadoAprendizajeDTO } from './ResultadoAprendizajeDTO.js'
import { CriterioEvaluacionDTO } from './CriterioEvaluacionDTO.js'


function base64toPdf(base64) {
    //El archivo como base64 incluye una cabecera inicial que hay que eliminar
    let matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    let file = 'archivo.pdf'
    console.log('matches' + matches.length)
    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    //Cambiar por async
    //Sería posible saltarse esto de alguna forma?
    fs.writeFileSync(file, matches[2], 'base64')
    return file
}

function limpiar(input) {

    if (input.startsWith("\u0003")) {
        input = input.replace("\u0003", "");
    }
    //No funciona pero pretende eliminar el punto final y los espacios al final de las frases 
    //input = input.replace("[\\s.\|.\\s]*$", "")
    input = input.trim()
    if (input[input.length - 1] === '.') {
        input = input.substring(0, input.length - 1);
    }
    return input;
}

function procesarTexto(paginas) {

    //Marco Competencias
    let marco = new MarcoCompetenciasDTO();
    //Criterio Evaluación
    let ce = null;
    //Resultado Aprendizaje
    let ra = null;

    //Dictionary < string, CompetenciaDTO > competencias = new Dictionary < string, CompetenciaDTO > ();
    let competencias = new Object()

    let modu = "";
    let ultimora = "";

    //Se ha detectado un problema por el cual hay un salto de línea en:
    //Módulo profesional: \n "Sistemas informáticos" (ejemplo)
    //Se ha añadido un check para salvarlo
    let excepcionModulo = false

    //Boolean para saber si estamos dentro de un módulo
    let modulo = false;
    //Boolean para saber si estamos procesando los resultados de aprendizaje
    let resultadoAprendizaje = false;
    //Boolean para saber si estamos procesando los criterios de evaluación de un RA
    let criteriosEvaluacion = false;
    //Regex para limpiar la cabecera del documento
    let regCabecera = ".*\\/.*\\/.*"
    //Regex que comprueba que la línea contenga algo de texto
    let regPie = ".*[a-zA-z]+.*"

    paginas.forEach((text, index) => {



        //Separamos línea a línea
        text = text.replace("\r", "");
        let lineas = text.split("\n");
        let frase = "";

        //Recorremos las líneas que componen el texto
        lineas.forEach((line) => {
            let linea = line;
            //Procesa una lína para asegurarse de que termina correctamente
            if (linea.length > 2) {

                linea.substring(0, linea.length - 1);
                //Eliminamos los espacios en blanco al final de la línea
                linea = linea.replace("\\s+$", "");

                if (linea.length > 1 && (linea[linea.length - 1] == '.' || linea[linea.length - 1] == ':')) {
                    frase = "";
                    //Esto no tiene mucho sentido porque una línea puede terminar en un punto por casualidad
                }
            }
            else if (linea === "") {
                frase = "";
            }
            frase += linea;

            //Identifica la denominación del marco
            if ((linea.trim().toLowerCase().startsWith("denominación") || linea.trim().toLowerCase().startsWith("denominacion")) && linea.toLowerCase().includes(":")) {
                marco.denominacion = limpiar(linea.substring(linea.indexOf(":") + 1));
                marco.siglas = marco.denominacionToSiglas(marco.denominacion);
                marco.nombreCortoCSV = marco.generarNombreCorto();
                marco.descripcionCSV = marco.denominacion;

            }

            if (linea.trim().toLowerCase().startsWith("nivel") && linea.toLowerCase().includes(":")) {
                if (linea.toLowerCase().includes("superior")) {
                    marco.nivel = "S";
                } else if (linea.toLowerCase().includes("medio")) {
                    marco.nivel = "M";
                }
                else if (linea.toLowerCase().includes("basico") || linea.toLowerCase().includes("básico")) {
                    marco.nivel = "B";
                }
            }

            //Identifica módulos profesionales
            if ((linea.trim().toLowerCase().startsWith("módulo profesional") || linea.trim().toLowerCase().startsWith("modulo profesional")) && linea.toLowerCase().includes(":")) {
                let mod = linea.substring(linea.indexOf(":") + 1)
                if (mod.length == 0) {
                    excepcionModulo = true
                }
                mod = limpiar(mod);

                //Comprueba si están en el mapa y si no es así los mete
                if (!marco.competencias.hasOwnProperty(mod)) {
                    marco.competencias[mod.trim()] = new CompetenciaDTO(mod, index + 1)
                    modu = mod.trim()
                }
                //modulos.add(new Modulo(mod));
                modulo = true;

            } else if (excepcionModulo) {
                let mod = linea
                console.log('Modulo a través de excepción:' + mod + "\nRaw: " + linea + "\nLongitud: " + mod.length)
                excepcionModulo = false
                mod = limpiar(mod);

                //Comprueba si están en el mapa y si no es así los mete
                if (!marco.competencias.hasOwnProperty(mod)) {
                    marco.competencias[mod.trim()] = new CompetenciaDTO(mod, index + 1)
                    modu = mod.trim()
                }
                //modulos.add(new Modulo(mod));
                modulo = true;
            }

            if (modulo) {

                if (linea.trim().toLowerCase().startsWith("resultados de aprendizaje y criterios de evaluaci")) {
                    resultadoAprendizaje = true;
                }
                if (resultadoAprendizaje) {
                    //Aquí vamos a procesar la línea porque estamos dentro de los resultados de aprendizaje
                    //Regex para el identificador del resultado de aprendizaje
                    let reg1 = "^[1-9]\\.\\s.*"
                    if (linea.match(reg1)) {
                        //Si detectamos un nuevo RA tras procesar los CEs del anterior
                        if (ce != null) {
                            try {
                                marco.competencias[modu].ras[ultimora].criterios.Add(ce.contenido, ce);
                                ce = null;
                            }
                            catch (e) { }
                        }

                        //Al crear un nuevo resultado de aprendizaje, limpiamos la numeración que lleve al principio
                        let limpiarRA = "^[1-9]\\.\\s"
                        let cleanRA = linea.replace(limpiarRA, "") //El string limpio
                        ra = new ResultadoAprendizajeDTO(cleanRA, index + 1)
                        //Marcamos los criterios de evaluación como false
                        //hasta que lleguemos a los ces de este ra
                        criteriosEvaluacion = false;

                        frase = "";
                    }
                    else if (!criteriosEvaluacion
                        && linea !== ""
                        && ra != null
                        && !linea.trim().toLowerCase().startsWith("criterios de evaluaci")
                        && !linea.match(regCabecera)
                        && linea.match(regPie)) {
                        ra.nombre += " " + linea;
                        ra.descripcionCSV += " " + linea;
                    }
                    else if (linea.trim().toLowerCase().startsWith("criterios de evaluaci")) {
                        //como vamos a empezar a meter los criterios de evaluación, el ra ya se ha formado

                        marco.competencias[modu].ras[ra.nombre] = ra
                        ultimora = ra.nombre;
                        criteriosEvaluacion = true;
                    }
                    else if (criteriosEvaluacion) {
                        //Regex para el identificador del criterio de evaluación
                        let reg = "^[a-z]\\).*"

                        if (linea.trim().toLowerCase().match(reg)) {
                            if (ce != null) {
                                try {
                                    marco.competencias[modu].ras[ultimora].criterios[ce.descripcionCSV] = ce
                                }
                                catch (e) { }
                            }

                            //Al crear un CE primero lo limpiamos
                            let limpiarCE = "^[a-z]\\)\\s"
                            let cleanRA = linea.replace(limpiarCE, "")
                            ce = new CriterioEvaluacionDTO(cleanRA, index + 1);
                        }
                        else if (!linea.trim().toLowerCase().startsWith("contenidos")
                            && ce != null) {


                            if (!linea.match(regCabecera) && linea.match(regPie)) {
                                ce.contenido += " " + linea;
                                ce.descripcionCSV += " " + linea;
                            }
                        }
                    }
                }
            }

            if (linea.trim().toLowerCase().startsWith("contenidos")) {
                modulo = false;
                resultadoAprendizaje = false;
                criteriosEvaluacion = false;
                ra = null;
                ce = null;
                ultimora = "";
                modu = "";

            }
        })
    })
    return marco;
}


//Funcion que procesa el contenido de un pdf y extrae el marco de competencias
//Acepta el contenido del pdf como base64 tal y como se recibe en la petición
export function pdfToMarco(body) {
    return new Promise(function (resolve, err) {

        console.log("Hemos entrado a procesar el marco")
        let file = base64toPdf(JSON.parse(body))
        let dataBuffer = fs.readFileSync(file)
        //Esto sería mas interesante procesarlo página a página, porque tal y como está ahora 
        //Cargas todo
        pdf(dataBuffer).then(function (data) {
            console.log("Numero de páginas: ", data.numpages)

            let marco = procesarTexto(data.pages)
            marco.iniciarMarco()

            //console.log("Devolvemos marco:", marco)
            resolve(marco)
        }).catch(function (err) {
            console.log("Se ha producido un error procesando el archivo pdf: ", err, err.msg)
        })
    })

}