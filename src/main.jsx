import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Traige } from './Triage.jsx'
import { ResultadoTriage } from './ResultadoTriage.jsx'
import { EditHistory } from './EditHistory.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="triage">
          <Route index element={<h2>Triage</h2>} />
          <Route path=":nss" element={<Traige />} />
        </Route> 
        <Route path='resultados-triage/:nss' element={<ResultadoTriage />} />
        <Route path='edit/:nss' element={<EditHistory />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
