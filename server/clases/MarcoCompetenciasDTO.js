export class MarcoCompetenciasDTO {

    //Variables
    denominacion; //Desarrollo de Aplicaciones Multiplataforma
    siglas; //DAM
    nivel; // B M S (Básico, Medio, Superior) 
    /// <summary>
    /// Identifica si este marco ha sido compartido contigo o lo has creado tu
    /// Default: false
    esCompartido = false;
    idPadreCSV;
    idCSV;
    nombreCortoCSV;
    descripcionCSV;
    descripcionFormatoCSV;
    valoresEscalaCSV;
    configuracionEscalaCSV;
    tipoReglaCSV;
    resultadoReglaCSV;
    configuracionReglaCSV;
    idReferenciasCruzadasCompetenciasCSV;
    idExportacionCSV;
    esMarcoCompetenciasCSV;
    taxonomiaCSV;

    competencias = {};

    denominacionToSiglas(denominacion) {
        let siglas = "";
        denominacion.split(" ").forEach((palabra) => {
            if (palabra.length > 1 && palabra.charAt(0) === palabra.charAt().toUpperCase()) {
                siglas += palabra[0];
            }
        })
        return siglas;
    }

    categoria() {
        if (this.nivel == null) { return ""; }
        switch (this.nivel) {
            case "B":
                return "GB";
            case "M":
                return "GM";
            case "S":
                return "GS";
            default:
                return "";
        }
    }

    generarNombreCorto() {
        var cat = this.categoria()
        return "CFP" + cat + " " + this.siglas;
    }



    ID() {
        var cat = this.categoria()
        if (cat != null && this.siglas != null) {
            return "mc_" + this.categoria().toLowerCase() + "_" + this.siglas.toLowerCase();
        }
        else {
            return "";
        }
    }

    iniciarVariablesCSV() {
        this.idPadreCSV ??= "";
        this.idCSV ??= this.ID();
        this.nombreCortoCSV ??= this.generarNombreCorto();
        this.descripcionCSV ??= "<p dir=\"\"ltr\"\" style=\"\"text-align:left;\"\">Marco de competencias del ciclo de formación profesional: " + generarNombreCorto() + ".</p>";
        this.descripcionFormatoCSV ??= "1"; //Fixed: 1
        this.valoresEscalaCSV ??= "No competente aún,Competente"; //Solo ciclo
        this.configuracionEscalaCSV ??= "[{\"\"scaleid\"\":\"\"2\"\"},{\"\"id\"\":1,\"\"scaledefault\"\":1,\"\"proficient\"\":0},{\"\"id\"\":2,\"\"scaledefault\"\":0,\"\"proficient\"\":1}]"; //Solo ciclo
        this.tipoReglaCSV ??= ""; //Opcional
        this.resultadoReglaCSV ??= ""; //Opcional
        this.configuracionReglaCSV ??= ""; //Opcional
        this.idReferenciasCruzadasCompetenciasCSV ??= ""; //Opcional
        this.idExportacionCSV ??= ""; //Opcional
        this.esMarcoCompetenciasCSV ??= "1"; //Solo ciclo
        this.taxonomiaCSV ??= "competency,outcome,indicator,level"; //Solo ciclo
    }

    // Inicia las variables del marco y de todo su contenido (competencias, RA, CE)
    iniciarMarco() {
        this.iniciarVariablesCSV()

        //Empezamos el contador en uno para que se asemeje mas al lenguaje natural
        let cant = 1;
        for (const [key, com] of Object.entries(this.competencias)) {
            com.iniciarCompetencia(",", this.idCSV, cant, this.generarNombreCorto())
            cant++;
        }
    }
}