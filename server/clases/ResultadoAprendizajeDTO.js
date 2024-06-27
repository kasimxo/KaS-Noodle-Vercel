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

    constructor(nombre, index) {
        this.nombre = nombre
        this.descripcionCSV = nombre
        this.pag = index
        this.criterios = {}
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
}