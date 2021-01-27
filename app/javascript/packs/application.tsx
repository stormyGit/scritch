import React from 'react'
import ReactDOM from 'react-dom'
import { App } from '../src/App'
import './application.css'
// import "reset-css";

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<App />, document.getElementById('root'))
})
