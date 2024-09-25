import { Link, Navigate } from "react-router-dom";
import { useState } from "react";

import transformacion from './../static/transformacion_icon.png'
import logo_ext_white from './../static/NoodleLogotipoExtended_Inv720.png'
import logo_ext_black from './../static/NoodleLogotipoExtended_720.png'


export function Index() {

    var dark = false
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        dark = true
    }

    return (
        <section id='contenedor_landing_page'>
            <div className="half">
                <img src={dark ? logo_ext_white : logo_ext_black} alt='Noodle' title="Noodle" id="logo_landing_page" />
                <p>Analiza y procesa boletines oficiales de forma eficiente, extrayendo la información relevante sin pérdida de datos.</p>
                <p> Elimina el tiempo dedicado a la lectura y análisis manual de documentos oficiales, e integra con Moodle, una de las principales plataformas educativas.</p>
                <Link to='/select' replace={true}>
                    <button className="btn_default" alt='Procesar marco de competencias' >
                        Procesar un nuevo marco de competencias
                    </button>
                </Link>
            </div>
            <img src={transformacion} alt={'documentos'} title='Documentos' id="imagen_landing_page" />
        </section>

    )
}