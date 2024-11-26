import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { Header } from "./components/Header"
import { createTrige, getTriage } from "./services/api"; 

const calcularTriage = ({ signosVitales, nivelDolor, estadoPaciente }) => {
    // Niveles críticos (Rojo)
    if (
      estadoPaciente.nivelConsciencia !== "Alerta" ||
      estadoPaciente.estadoRespiratorio === "No respira" ||
      signosVitales.frecuenciaCardiaca < 40 || signosVitales.frecuenciaCardiaca > 150 ||
      signosVitales.temperatura < 35 || signosVitales.temperatura > 39 ||
      nivelDolor >= 9
    ) {
      return "Rojo";
    }
  
    // Niveles urgentes (Amarillo)
    if (
      estadoPaciente.estadoRespiratorio === "Dificultad" ||
      signosVitales.frecuenciaCardiaca < 60 || signosVitales.frecuenciaCardiaca > 120 ||
      signosVitales.saturacionOxigeno < 90 ||
      nivelDolor >= 5
    ) {
      return "Naranja";
    }
  
    // Niveles no urgentes (Azul)
    return "Azul";
};

export const Traige = () => {
    let navigate = useNavigate()    

    const { nss } = useParams()

    useEffect(() => {
        const fetchDatos = async () => {
            let dataTriage = await getTriage(nss)
            if (dataTriage) navigate(`/resultados-triage/${nss}`)
        }
        
        fetchDatos()
    }, [])

    //console.log(nss)
    const [signosVitales, setSignosVitales] = useState({
      frecuenciaCardiaca: "",
      frecuenciaRespiratoria: "",
      presionArterial: "",
      temperatura: "",
      saturacionOxigeno: "",
    });
    const [razonConsulta, setRazonConsulta] = useState("");

    const [estadoPaciente, setEstadoPaciente] = useState({
      nivelConsciencia: "Alerta",
      estadoRespiratorio: "Normal",
      colorPiel: "Normal",
      dolor: ""
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Crear el objeto que será enviado a Firestore
      const triageData = {
        razonConsulta,
        signosVitales,
        estadoPaciente,
        consultorioAsignado: 0,
        fecha: new Date().toISOString(),
      };

      const nivelTriage = calcularTriage(triageData);
      triageData.nivelTriage = nivelTriage;
      //console.log(triageData)

      createTrige(nss, triageData)
      navigate(`/resultados-triage/${nss}`)
    }

    return <>
        <Header />
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mb-10 px-4">
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razón de consulta:</label>
                <textarea
                    required
                    value={razonConsulta}
                    onChange={(e) => setRazonConsulta(e.target.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></textarea>
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Frecuencia cardíaca:</label>
                <input 
                    required
                    type="number" 
                    value={signosVitales.frecuenciaCardiaca}
                    onChange={(e) => setSignosVitales({ ...signosVitales, frecuenciaCardiaca: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Frecuencia respiratoria:</label>
                <input 
                    required
                    type="number" 
                    value={signosVitales.frecuenciaRespiratoria}
                    onChange={(e) => setSignosVitales({ ...signosVitales, frecuenciaRespiratoria: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Presión arterial:</label>
                <input 
                    required
                    type="text" 
                    value={signosVitales.presionArterial}
                    onChange={(e) => setSignosVitales({ ...signosVitales, presionArterial: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Temperatura:</label>
                <input 
                    required
                    type="number" 
                    value={signosVitales.temperatura}
                    onChange={(e) => setSignosVitales({ ...signosVitales, temperatura: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Saturación de oxígeno:</label>
                <input 
                    required
                    type="number" 
                    value={signosVitales.saturacionOxigeno}
                    onChange={(e) => setSignosVitales({ ...signosVitales, saturacionOxigeno: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nivel de dolor (1-10):
                </label>
                <input 
                    required
                    type="number" 
                    min="1"
                    max="10"
                    value={estadoPaciente.dolor}
                    onChange={(e) => setEstadoPaciente({ ...estadoPaciente, dolor: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nivel de consciencia:
                </label>
                <select
                    value={estadoPaciente.nivelConsciencia}
                    onChange={(e) => setEstadoPaciente({ ...estadoPaciente, nivelConsciencia: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="Alerta">Alerta</option>
                    <option value="Confuso">Confuso</option>
                    <option value="Inconsciente">Inconsciente</option>
                </select>
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Estado respiratorio:
                </label>
                <select
                    value={estadoPaciente.estadoRespiratorio}
                    onChange={(e) => setEstadoPaciente({ ...estadoPaciente, estadoRespiratorio: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="Normal">Normal</option>
                    <option value="Dificultad">Dificultad</option>
                    <option value="No respira">No respira</option>
                </select>
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Color de piel:
                </label>
                <select
                    value={estadoPaciente.colorPiel}
                    onChange={(e) => setEstadoPaciente({ ...estadoPaciente, colorPiel: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="Normal">Normal</option>
                    <option value="Pálido">Pálido</option>
                    <option value="Cianótico">Cianótico</option>
                </select>
            </div>

            <button 
                type="submit" 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Calcular Triage
            </button>
        </form>
    </>
}