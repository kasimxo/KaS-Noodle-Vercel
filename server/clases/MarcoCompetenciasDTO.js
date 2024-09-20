import { CompetenciaDTO } from "./CompetenciasDTO.js";
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

    addCompetenciaFromCSV(linea) {
        let competencia = new CompetenciaDTO();
        competencia.fromCSV(linea);
        this.competencias[linea[1]] = competencia;
    }

    addResultadoCriterioFromCSV(linea) {
        let idPadreObjeto = linea[0];
        if (this.competencias.hasOwnProperty(idPadreObjeto)) {
            this.competencias[idPadreObjeto].addResultadoAprendizajeFromCSV(linea);
        }
        else {

            Object.keys(this.competencias).forEach((key) => {
                let com = this.competencias[key]
                if (com.ras.hasOwnProperty(idPadreObjeto)) {
                    com.ras[idPadreObjeto].addCriterioEvaluacionFromCSV(linea);
                }
            })

        }
    }
}