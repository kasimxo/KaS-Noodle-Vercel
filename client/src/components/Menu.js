import { Link, Navigate } from 'react-router-dom'
import './../css/style.css'
import logo from './../static/NoodleLogotipoExtended_Inv720.png'
import { useState } from 'react'

export function Menu() {

    return (

        <div id="menu" >
            <Link to='/' replace={true} >
                <img src={logo} id="logo_ext" alt="Logo de Noodle" />
            </Link>
        </div>
    )
}