import { ResultadoAprendizajeDTO } from "./ResultadoAprendizajeDTO.js"
export class CompetenciaDTO {

    ras
    nombre
    pag

    idPadreCSV
    idCSV
    nombreCortoCSV
    descripcionCSV
    descripcionFormatoCSV
    valoresEscalaCSV
    configuracionEscalaCSV
    tipoReglaCSV
    resultadoReglaCSV
    configuracionReglaCSV
    idReferenciasCruzadasCompetenciasCSV
    idExportacionCSV
    esMarcoCompetenciasCSV
    taxonomiaCSV

    constructor(nombre, index) {

        if (nombre !== undefined) {
            this.nombre = nombre.trim();
            this.pag = index;
            this.ras = {}
            this.nombreCortoCSV = nombre.trim();
        } else {
            //second empty constructor
            this.ras = {}
        }
    }

    generarIdentificador(idPadre, cardinalidad) {
        let abc = "abcdefghijklmnopqrstuvwxyz";
        return idPadre.substring(0, idPadre.length - 1) + "_" + abc[cardinalidad];
    }

    NombreCorto(cardinalidad) {
        let abc = "abcdefghijklmnopqrstuvwxyz";
        return "CPPS " + abc[cardinalidad] + ") " + this.nombre;
    }

    iniciarVariablesCSV(identificadorPadre, identificador, cardinalidad, nombreCiclo) {

        //Las competencias no necesitan del id padre, pero lo utilizan para generar su id propio

        this.idPadreCSV = identificadorPadre.replace(",", "")
        this.idCSV ??= this.generarIdentificador(identificador, cardinalidad);
        this.nombreCortoCSV ??= this.NombreCorto(cardinalidad);
        //La descripción en las competencias se deja vacía
        this.descripcionCSV ??= "<p dir=\"\"ltr\"\" style=\"\"text-align:left;\"\">" + "</p>";
        this.descripcionFormatoCSV ??= "1"; //Fixed: 1
        this.valoresEscalaCSV ??= ""; //Solo ciclo
        this.configuracionEscalaCSV ??= ""; //Solo ciclo
        this.tipoReglaCSV ??= ""; //Opcional
        this.resultadoReglaCSV ??= ""; //Opcional
        this.configuracionReglaCSV ??= ""; //Opcional
        this.idReferenciasCruzadasCompetenciasCSV ??= ""; //Opcional
        this.idExportacionCSV ??= ""; //Opcional
        this.esMarcoCompetenciasCSV ??= ""; //Solo ciclo
        this.taxonomiaCSV ??= ""; //Solo ciclo

    }

    iniciarCompetencia(identificadorPadre, identificador, cardinalidad, nombreCiclo) {
        this.iniciarVariablesCSV(identificadorPadre, identificador, cardinalidad, nombreCiclo);

        let cantidad = 0
        for (const [key, ra] of Object.entries(this.ras)) {
            ra.iniciarRA(this.idCSV, cantidad)
            cantidad++;
        }
    }

    fromCSV(linea) {
        //0 Identificador padre
        this.idPadreCSV = linea[0];
        //1 Identificador
        this.idCSV = linea[1];
        //2 Nombre corto
        this.nombreCortoCSV = linea[2];
        this.denominacion = this.nombreCortoCSV; //Al sacarlo del csv, guardamos el nombre de esta forma
        //3 Descripción
        this.descripcionCSV = linea[3];
        //4 Descripción del formato
        this.descripcionFormatoCSV = linea[4];
        //5 Valores de escala
        this.valoresEscalaCSV = linea[5];
        //6 Configuración de escala
        this.configuracionEscalaCSV = linea[6];
        //7 Tipo de regla (opcional)
        this.tipoReglaCSV = linea[7];
        //8 Resultado de la regla (opcional)
        this.resultadoReglaCSV = linea[8];
        //9 Configuración de regla (opcional)
        this.configuracionReglaCSV = linea[9];
        //10 Identificadores de referencias cruzadas de competencias
        this.idReferenciasCruzadasCompetenciasCSV = linea[10];
        //11 Identificador de la exportación (opcional)
        this.idExportacionCSV = linea[11];
        //12 Es marco de competencias
        this.esMarcoCompetenciasCSV = linea[12];
        //13 Taxonomía
        this.taxonomiaCSV = linea[13];
    }

    addResultadoAprendizajeFromCSV(linea) {
        let resultadoAprendizaje = new ResultadoAprendizajeDTO();
        resultadoAprendizaje.fromCSV(linea);
        this.ras[linea[1]] = resultadoAprendizaje;
    }
}