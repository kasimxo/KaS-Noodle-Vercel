import { Link, Navigate } from 'react-router-dom'
import './../css/style.css'
import logo from './../static/NoodleLogotipoExtended_Inv720.png'
import { useState } from 'react'

export function Menu() {

    const [listo, setListo] = useState(false)
    return (

        <div id="menu" >
            <img src={logo} id="logo_ext" alt="Logo de Noodle" onClick={() => setListo(true)} />
            {listo && <Navigate to='/' replace={true} />}
        </div>
    )
}