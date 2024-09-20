export class CriterioEvaluacionDTO {
    contenido
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

    constructor(nombre, pag) {
        if (nombre !== undefined) {
            this.contenido = nombre;
            this.descripcionCSV = nombre;
            this.pag = pag;
        }
    }

    iniciarCE(identificadorPadre, numeroPadre, cardinalidad) {
        this.iniciarVariablesCSV(identificadorPadre, numeroPadre, cardinalidad);
    }

    iniciarVariablesCSV(identificadorPadre, numeroPadre, cardinalidad) {
        this.idPadreCSV ??= identificadorPadre.replace("\"", "").replace(",", "");
        this.idCSV ??= this.generarID(identificadorPadre.replace("\"", "").replace(",", ""), cardinalidad);
        this.nombreCortoCSV ??= this.generarNombreCorto(numeroPadre, cardinalidad);
        this.descripcionCSV ??= "<p dir=\"\"ltr\"\" style=\"\"text-align:left;\"\">" + contenido + "</p>";
        this.descripcionFormatoCSV ??= "1"; //Fixed: 1
        this.valoresEscalaCSV ??= ""; //Solo ciclo
        this.configuracionEscalaCSV ??= ""; //Solo ciclo
        this.tipoReglaCSV ??= ""; //Opcional
        this.resultadoReglaCSV ??= ""; //Opcional
        this.configuracionReglaCSV ??= ""; //Opcional
        this.idReferenciasCruzadasCompetenciasCSV ??= ""; //Opcional
        this.idExportacionCSV ??= ""; //Opcional
        this.esMarcoCompetenciasCSV ??= ""; //Solo ciclo
        this.taxonomiaCSV ??= ""; //Opcional
    }

    generarID(idPadre, cardinalidad) {
        let abc = "abcdefghijklmnopqrstuvwxyz";
        return idPadre + "_" + abc[cardinalidad];
    }

    generarNombreCorto(numeroPadre, cardinalidad) {
        let abc = "abcdefghijklmnopqrstuvwxyz";
        return "CE " + numeroPadre + "." + abc[cardinalidad];
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
}