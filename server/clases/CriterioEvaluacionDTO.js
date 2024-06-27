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
        this.contenido = nombre;
        this.descripcionCSV = nombre;
        this.pag = pag;
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
}