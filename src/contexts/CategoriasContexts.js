import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

//creat el context
export const CategoriaContexts = createContext();


//provider
const CategoriasProvider = (props) => {

    // aqui se crea el state
    const [ categorias, guardarCategorias ] = useState([]);

    useEffect( () => {
        const obtenerCategorias = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

            const categorias = await axios.get(url);

            guardarCategorias(categorias.data.drinks);
            
        }
        obtenerCategorias();
    }, []);

    return (
        <CategoriaContexts.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriaContexts.Provider>
    )

}

export default CategoriasProvider;