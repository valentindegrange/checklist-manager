import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const foo = <h3>Boiler</h3>;



export {foo}

ReactDOM.render(
    foo,
    document.getElementById('boiler')
);