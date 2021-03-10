import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

//creat el context
export const PreparacionContexts = createContext();


//provider
const PreparacionProvider = (props) => {

    // aqui se crea el state
    const [ idReceta, guardarIDReceta ] = useState(null);

    const [ detalle, guardarDetalle ] = useState({});

    useEffect( () => {

        const details = async () => {
            if(!idReceta) return;
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;
            const respuesta = await axios.get(url);
            guardarDetalle(respuesta.data.drinks[0]);
        }

        details();

    }, [idReceta]);

    return (
        <PreparacionContexts.Provider
            value={{
                detalle,
                guardarIDReceta,
                guardarDetalle
            }}
        >
            {props.children}
        </PreparacionContexts.Provider>
    )

}

export default PreparacionProvider;