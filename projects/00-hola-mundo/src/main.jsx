import React from 'react'
import ReactDom from 'react-dom/client'
import { App } from './App';
import './index.css'

const root = ReactDom.createRoot(document.getElementById('root'));

const Button = ({text}) => {
  return(
    <button>{ text }</button>
  );
}

root.render(
  <App />
)
