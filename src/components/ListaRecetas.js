import React, {useContext} from 'react';
import Receta from './Receta';

import { RecetasContexts } from '../contexts/RecetasContext';

const ListaRecetas = () => {

    const { recetas } = useContext(RecetasContexts);

    return ( 
        <div className="row mt-5">
            {
                recetas.map( receta => (
                    <Receta 
                        key={receta.idDrink}
                        receta={receta}
                    />
                ))
            }
        </div>
     );
}
 
export default ListaRecetas;