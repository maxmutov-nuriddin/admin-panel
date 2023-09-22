import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import "antd/dist/reset.css"
import './index.css'
import { StudentsContext } from './context/StudentsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StudentsContext>
      <App />
    </StudentsContext>
  </React.StrictMode>,
)
