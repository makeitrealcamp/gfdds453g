import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRedirect} from 'react-router' // Las cosas que necesitasmos de React Router
import {App, Page1, Page2, NotFound} from './App'; // Las cosas que necesitamos de App.js
import './index.css';

// Implementa las rutas aca


ReactDOM.render(
  <App />, // Cuando tengas las rutas listas cambia App aca por ellas
  document.getElementById('root')
);
