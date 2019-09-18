import React from 'react';
import './App.css';

import AppStateContext from './StateContexts/AppStateContext';
import ApplicationLayout from './components/ApplicationLayout/ApplicationLayout';

function App() {

  return (
    <AppStateContext.Provider>
      <div className="app">
        <header className="app-header"><h1>React Simple State Demo <i className="fa fa-thumbs-up ml-2"></i></h1></header>
        <ApplicationLayout/>
      </div>
    </AppStateContext.Provider>
  );
}

export default App;
