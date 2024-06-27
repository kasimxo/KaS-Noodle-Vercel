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
        this.nombre = nombre.trim();
        this.pag = index;
        this.ras = {}
        this.nombreCortoCSV = nombre.trim();
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
}