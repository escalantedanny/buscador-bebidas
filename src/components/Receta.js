import React, {useContext, useState} from 'react';
import {PreparacionContexts} from '../contexts/PreparacionContexts';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
//import classes from '*.module.css';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    paper: {
      position: 'absolute',
      width: 600,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Receta = ({receta}) => {

    // para crear clases a material
    const classes = useStyles();

    //configuracion del modal de material ui
    const [ modalStyle ] = useState(getModalStyle);
    const [ open, setOpen ] = useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
        

    const { detalle, guardarIDReceta, guardarDetalle } = useContext(PreparacionContexts);

    const mostrarIngredientes = detalle => {
        let ingredientes = [];
        for (let i = 1; i < 16; i++) {
            if( detalle[`strIngredient${i}`] ) {
                ingredientes.push(
                    <li>{ detalle[`strIngredient${i}`] } - { detalle[`strMeasure${i}`] }</li>
                )
            }
        }
        return ingredientes;
    }
    
    return ( 
       <div className="col-md-4 mb-3">
           <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>
                <img className="card-img-top" src={receta.strDrinkThumb} alt={`Imagen de ${receta.strDrink}`}/>
                <div className="card-body">
                    <button 
                    className="btn btn-block btn-primary"
                    type="button"
                    onClick={ () => {
                        guardarIDReceta(receta.idDrink);
                        handleOpen();
                    }}
                    >Ver Receta</button>

                    <Modal
                        open={open}
                        onClose={ () => {
                            guardarIDReceta(null);
                            guardarDetalle({});
                            handleClose();
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{detalle.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>
                                {detalle.strIntructions}
                            </p>
                            <img className="img-fluid my-4" src={detalle.strDrinkThumb} />
                            <h3>Ingrediente - Cantidades</h3>
                            <ul>
                                {
                                    mostrarIngredientes(detalle)
                                }
                            </ul>
                            <h3>Categoria</h3>
                            <p>{detalle.strCategory}</p>
                        </div>
                    </Modal>
                </div>
           </div>
       </div>
     );
}
 
export default Receta;