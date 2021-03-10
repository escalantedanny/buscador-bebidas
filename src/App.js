import React, {Fragment} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import ListaRecetas from './components/ListaRecetas';

import CategoriasProvider from './contexts/CategoriasContexts';
import RecetasProvider from './contexts/RecetasContext';
import PreparacionProvider from './contexts/PreparacionContexts';

function App() {
  return (
    <CategoriasProvider>
      <RecetasProvider >
        <PreparacionProvider>
              <Header />

              <div className="container mt-5">
                <div className="row">
                  <Formulario />
                </div>
                <ListaRecetas />
              </div>
        </PreparacionProvider>
      </RecetasProvider>
    </CategoriasProvider>
  );
}

export default App;
