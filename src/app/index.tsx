/* eslint-disable @conarti/feature-sliced/public-api */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Providers } from './Providers'
import './global.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Providers />,
    // <React.StrictMode>
    // </React.StrictMode>,
)
