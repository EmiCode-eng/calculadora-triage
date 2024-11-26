import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { Header } from "./components/Header"
import { updatePaciente, getPaciente, createPaciente } from "./services/api"

export const EditHistory = () => {
    const [datosPrevios, setDatosPrevios] = useState(false)
    let navigate = useNavigate()    

    const { nss } = useParams()

    //console.log(nss)
    const [contactoEmergencia, setContactoEmergencia] = useState({
        nombre: "",
        relacion: "",
        telefono: ""
    })
    const [direccion, setDireccion] = useState("")
    const [edad, setEdad] = useState()
    const [historialMedico, setHistorialMedico] = useState([])
    const handleDiagnosticoChange = (index, value) => {
        const nuevosDiagnosticos = [...historialMedico];
        nuevosDiagnosticos[index] = value;
        setHistorialMedico(nuevosDiagnosticos);
      };
      const eliminarDiagnostico = (index) => {
        const nuevosDiagnosticos = historialMedico.filter((_, i) => i !== index);
        setHistorialMedico(nuevosDiagnosticos);
      };
    const agregarCampoDiagnostico = () => {
        setHistorialMedico([...historialMedico, ""]);
    }
    const [nombre, setNombre] = useState("")
    const [sexo, setSexo] = useState("")
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Crear el objeto que será enviado a Firestore
      const pacienteData = {
        contactoEmergencia,
        direccion,
        edad,
        historialMedico,
        nombre,
        sexo
      };

      //const nivelTriage = calcularTriage(triageData);
      //triageData.nivelTriage = nivelTriage;
      //console.log(pacienteData)
      if (datosPrevios) {
          updatePaciente(nss, pacienteData)
      } else {
        createPaciente(nss, pacienteData)
      }
      //createTrige(nss, triageData)
      navigate(`/resultados-triage/${nss}`)
    }
    useEffect(() => {
        const fetchPaciente = async () => {
            let data = await getPaciente(nss)
            if (data) {
                setNombre(data.nombre)
                setEdad(data.edad)
                setSexo(data.sexo)
                setDireccion(data.direccion)
                setHistorialMedico(data.historialMedico)
                setContactoEmergencia(data.contactoEmergencia)
                setDatosPrevios(true)
            }
        }
        
        fetchPaciente()
    }, [])
    return <>
        <Header />
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mb-10 px-4">
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre:</label>
                <input 
                    required
                    type="text" 
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Edad:</label>
                <input 
                    required
                    type="number" 
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sexo:</label>
                <select 
                    value={sexo}
                    onChange={(e) => setSexo(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option selected>Selecciona una opción</option>
                    <option value="Mujer">Mujer</option>
                    <option value="Hombre">Hombre</option>
                </select>
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dirección:</label>
                <input 
                    required
                    type="text" 
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Historial Medico:</label>
                {historialMedico.map((historial, index) => (
                    <div key={index} style={{ marginBottom: "10px", display: "flex", alignItems: "flex-start" }}>
                        <input 
                            required
                            type="text" 
                            value={historial}
                            placeholder={`Diagnostico ${index + 1}`}
                            onChange={(e) => handleDiagnosticoChange(index, e.target.value)}
                            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        />
                        <button
                            type="button"
                            onClick={() => eliminarDiagnostico(index)}
                            style={{
                            padding: "8px",
                            backgroundColor: "#ff4d4d",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            }}
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
                
                <button
                    type="button"
                    onClick={agregarCampoDiagnostico}
                    style={{
                    padding: "8px 16px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    }}
                >
                    Añadir otro diagnóstico
                </button>
            </div>
            <h5 className="mb-4">Contacto de Emergencia</h5>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nombre:
                </label>
                <input 
                    required
                    type="text"
                    value={contactoEmergencia.nombre}
                    onChange={(e) => setContactoEmergencia({ ...contactoEmergencia, nombre: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Relación:
                </label>
                <input 
                    required
                    type="text"
                    value={contactoEmergencia.relacion}
                    onChange={(e) => setContactoEmergencia({ ...contactoEmergencia, relacion: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Teléfono:
                </label>
                <input 
                    required
                    type="text"
                    value={contactoEmergencia.telefono}
                    onChange={(e) => setContactoEmergencia({ ...contactoEmergencia, telefono: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Dirección:
                </label>
                <input 
                    required
                    type="text"
                    value={contactoEmergencia.direccion}
                    onChange={(e) => setContactoEmergencia({ ...contactoEmergencia, direccion: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                />
            </div>
            
            <div className="mb-4 items-center justify-between flex space-x-4 rtl:space-x-reverse">
                <button type="button" onClick={() => navigate(`/resultados-triage/${nss}`)} className="font-medium rounded-lg text-base px-6 py-3  text-center text-red-700 border-red-700 hover:text-white border  hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                    Cancelar
                </button>
                <button type="submit" className="px-6 py-3.5 text-base font-medium text-white rounded-lg text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Guardar
                </button>
            </div>
        </form>
    </>
}