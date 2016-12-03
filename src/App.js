import React, { Component } from 'react';
import {Link} from 'react-router'

/// En este archivo solo tienes que agregar codigo en la linea 14, el resto ya esta implementado.

export class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <Link to='/page1'>Page 1</Link> {/* Este componente viene de React Router*/}
          <Link to='/page2'>Page 2</Link>
        </nav>
        {this.props.children}
      </div>
    )
  }
}

export const Page1 = (props) => {
  return (
    <h1>Pagina 1</h1>
  )
}

export const Page2 = (props) => {
  return (
    <h1>Pagina 2</h1>
  )
}

export const NotFound = (props) => {
  return (
    <h1>Pagina no encontrada</h1>
  )
}
