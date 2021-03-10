import React, { useContext, useState } from 'react';
import Error from './Error';

import { CategoriaContexts } from '../contexts/CategoriasContexts';
import { RecetasContexts } from '../contexts/RecetasContext';

const Formulario = () => {

    const [ busqueda, guardarBusqueda ] = useState({
        nombre : '',
        categoria : ''
    })

    const { categorias } = useContext(CategoriaContexts);
    const { buscarRecetas, guardarConsulta, recetas } = useContext(RecetasContexts);

    const [ error, guardarError ] = useState(false);

    // funcion para leer el contenido
    const obtenerDatosReceta = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    const submitRecetas = e => {
        e.preventDefault();
        if(busqueda.nombre === '' || busqueda.categoria === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        buscarRecetas(busqueda);
        guardarConsulta(true);
    }

    return ( 

        <form 
            className="col-12"
            onSubmit={ submitRecetas }
        >
            <fieldset>
                <legend>Busca bebidas por categoría o Ingredientes</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input 
                        name="nombre"
                        className="form-control"
                        placeholder="Buscar por Ingrediente"
                        onChange={obtenerDatosReceta}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-control"
                        name="categoria"
                        onChange={obtenerDatosReceta}
                    >
                    <option value="">Selecciona una Categoria</option>
                    {
                        categorias.map(categoria => (
                            <option 
                                key={categoria.strCategory}
                                value={categoria.strCategory}
                            >{categoria.strCategory}
                            </option>
                        ))
                    }
                    </select>
                </div>
                <div className="col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Buscar Bebidas"
                    />
                </div>
            </div>
            {error ? <Error mensaje="Debe ingresar Ingrediente y categoria"/> : null}
        </form>
     );
}
 
export default Formulario;