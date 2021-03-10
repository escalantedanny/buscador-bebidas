import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

//creat el context
export const RecetasContexts = createContext();

//provider
const RecetasProvider = (props) => {

    const [recetas, guardarRecetas] = useState([]);

    const [busqueda, buscarRecetas] = useState({
        nombre : '',
        categoria : ''
    });

    const [consultar, guardarConsulta] = useState(false);

    const { nombre, categoria } = busqueda;

    useEffect( () => {

        if(consultar){
            const obtenerRecetas = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
                const resultado = await axios.get(url);
                guardarRecetas(resultado.data.drinks);
                
            }
            obtenerRecetas();
        }

    }, [busqueda])

    return (
        <RecetasContexts.Provider
            value={{
                buscarRecetas,
                guardarConsulta,
                recetas
            }}
        >
            {props.children}
        </RecetasContexts.Provider>
    )

}

export default RecetasProvider;