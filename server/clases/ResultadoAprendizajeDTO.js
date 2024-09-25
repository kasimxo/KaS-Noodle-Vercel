import { CriterioEvaluacionDTO } from "./CriterioEvaluacionDTO.js"
export class ResultadoAprendizajeDTO {

    criterios
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
    criterios = {}

    constructor(nombre, index) {
        if (nombre !== undefined) {
            this.nombre = nombre
            this.descripcionCSV = nombre
            this.pag = index

        } else {
            //second empty constructor

        }
    }

    iniciarVariablesCSV(identificadorPadre, cardinalidad) {
        this.idPadreCSV ??= identificadorPadre.replace("\"", "").replace(",", "")
        this.idCSV ??= this.generarID(identificadorPadre.replace("\"", "").replace(",", ""), cardinalidad)
        this.nombreCortoCSV ??= this.generarNombreCorto(cardinalidad)
        this.descripcionCSV ??= "<p dir=\"\"ltr\"\" style=\"\"text-align:left;\"\">" + nombre + ".</p>";
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

    generarID(idPadre, cardinalidad) {
        return idPadre + "_" + cardinalidad
    }

    generarNombreCorto(cardinalidad) {
        return "RA " + cardinalidad
    }

    iniciarRA(identificadorPadre, cardinalidad) {
        this.iniciarVariablesCSV(identificadorPadre, cardinalidad);

        let cantidad = 0
        for (const [key, ce] of Object.entries(this.criterios)) {
            ce.iniciarCE(this.idCSV, cardinalidad, cantidad)
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

    addCriterioEvaluacionFromCSV(linea) {
        let ce = new CriterioEvaluacionDTO();
        ce.fromCSV(linea);
        this.criterios[linea[1]] = ce;
    }
}