import { useState } from "react"
import { useNavigate } from "react-router"
import { Header } from "./components/Header"

export const App = () => {
  const [nss, setNss] = useState()
  const [error, setError] = useState('')

  let navigate = useNavigate()

  const handleChange = (nssNV) => {

    // Validar que solo contenga números
    if (/^\d*$/.test(nssNV)) {
      setNss(nssNV);
      // Validar si tiene 11 caracteres
      if (nssNV.length === 11) {
        setError('');
        return true
      } else {
        setError('El NSS consiste de 11 dígitos.');
        return false
      }
    } else {
      setError('Solo se permiten números.');
      return false
    }
  };

  const handleSearch = (e) => {
    e.preventDefault()

    if (handleChange(nss)) {
      navigate(`/triage/${nss.trim()}`)
    }

  }

  return (
    <>
        <Header />
        <main className="flex flex-col items-center justify-center h-64">
          <p className="mb-5">Ingrese el NSS</p>
          <form onSubmit={handleSearch}>
            <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative w-80">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input 
                  type="search" 
                  value={nss}
                  onChange={e => setNss(e.target.value)}
                  maxLength={11}
                  id="search" 
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="NSS" 
                  required 
                />
                <button 
                  type="submit" 
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Buscar
                </button>
            </div>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </main>
    </>
  )
}
