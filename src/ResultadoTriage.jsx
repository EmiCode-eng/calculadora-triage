import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { Header } from "./components/Header"
import { getPaciente, getTriage, updateTriage, deleteTriage } from "./services/api"

const asignarConsultorio = (nss) => {
    const consultorioAsignado = Math.floor(Math.random() * 20 + 1)
    const data = { consultorioAsignado }
    updateTriage(nss, data)
    return consultorioAsignado
}


export const ResultadoTriage = () => {
    const navigate = useNavigate()
    const { nss } = useParams()
    const [triage, setTriage] = useState(null)
    const [pacienteData, setPacienteData] = useState(null)

    useEffect(() => {
        const fetchDatos = async () => {
            let data = await getPaciente(nss)
            let dataTriage = await getTriage(nss)
            if (data) setPacienteData(data)
            if (dataTriage) {
                setTriage(dataTriage)
            }
        }
        
        fetchDatos()
    }, [])

    const darDeAlta = async() => {
        if (confirm('¿Esta seguro de darle de alta?')) {
            await deleteTriage(nss)
            navigate('/')
        }
    }

    const fecha = triage ? triage.fecha : ""
    const date = new Date(fecha)
    const fechaFormateada = date.toLocaleDateString('es-ES')
    return <>
        <Header />
        <main className="max-w-7xl mx-auto flex flex-col lg:flex-row">
            <article className="flex-1 mx-2 mb-10">
                <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    {!triage ? <></> : triage.nivelTriage === 'Rojo'  
                        ? <h5 className="mb-2 py-2 text-3xl font-bold bg-red-600 text-white dark:text-black">Nivel Triage - Rojo</h5>
                        : triage.nivelTriage === 'Naranja' ? <h5 className="mb-2 py-2 text-3xl font-bold bg-orange-600 text-white dark:text-white">Nivel Triage - Naranja</h5>
                        : <h5 className="mb-2 py-2 text-3xl font-bold bg-sky-600 text-white dark:text-white">Nivel Triage - Azul</h5>
                    }
                    
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <tbody>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                        Tipo de Atención
                                    </th>
                                    <td className="px-6 py-4">
                                        {!triage ? "" 
                                            : triage.nivelTriage === 'Rojo' ? <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3"><span className="flex w-2.5 h-2.5 bg-red-500 rounded-full me-1.5 flex-shrink-0"></span>Reanimación</span> 
                                            : triage.nivelTriage === 'Naranja' ? <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3"><span className="flex w-2.5 h-2.5 bg-orange-500 rounded-full me-1.5 flex-shrink-0"></span>Urgencia</span> 
                                            : <span className="flex items-center text-sm font-normal text-gray-900 dark:text-white me-3"><span className="flex w-2.5 h-2.5 bg-sky-500 rounded-full me-1.5 flex-shrink-0"></span>Sin Urgencia</span>
                                        }
                                    </td>
                                </tr>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                        Área de Atención
                                    </th>
                                    <td className="px-6 py-4">
                                        {!triage ? "" 
                                            : triage.nivelTriage === 'Rojo' ? <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3"><span className="flex w-2.5 h-2.5 bg-red-500 rounded-full me-1.5 flex-shrink-0"></span>Área de Reanimación</span> 
                                            : triage.nivelTriage === 'Naranja' ? <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3"><span className="flex w-2.5 h-2.5 bg-orange-500 rounded-full me-1.5 flex-shrink-0"></span>Consultario de Primer Contacto</span> 
                                            : <span className="flex items-center text-sm font-normal text-gray-900 dark:text-white me-3"><span className="flex w-2.5 h-2.5 bg-sky-500 rounded-full me-1.5 flex-shrink-0"></span>Unidad de Medicina Familiar</span>
                                        }
                                    </td>
                                </tr>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                        Consultorio Asignado
                                    </th>
                                    <td className="px-6 py-4">
                                        {!triage ? "" : triage.consultorioAsignado !== 0 ? triage.consultorioAsignado : "--"}
                                        {/*consultorio !== 0 ? consultorio : "--"*/}
                                    </td>
                                </tr>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                        Tiempo de Espera para Atención
                                    </th>
                                    <td className="px-6 py-4">
                                        {!triage ? "" 
                                            : triage.nivelTriage === 'Rojo' ? <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3"><span className="flex w-2.5 h-2.5 bg-red-500 rounded-full me-1.5 flex-shrink-0"></span>Inmediato - Casi 3 minutos</span> 
                                            : triage.nivelTriage === 'Naranja' ? <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3"><span className="flex w-2.5 h-2.5 bg-orange-500 rounded-full me-1.5 flex-shrink-0"></span>Hasta 30 minutos</span> 
                                            : <span className="flex items-center text-sm font-normal text-gray-900 dark:text-white me-3"><span className="flex w-2.5 h-2.5 bg-sky-500 rounded-full me-1.5 flex-shrink-0"></span>Hasta 180 minutos</span>
                                        }
                                    </td>
                                </tr>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                        Razón de Consulta
                                    </th>
                                    <td className="px-6 py-4">
                                        {triage ? triage.razonConsulta : "--"}
                                    </td>
                                </tr>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                        Signos Vitales
                                    </th>
                                    <td className="px-6 py-4">
                                        {triage 
                                            ? <>
                                                <p className="  mb-2"><span className="font-medium text-gray-600">Frecuencia Cardiaca:</span> {triage.signosVitales.frecuenciaCardiaca}</p>
                                                <p className="  mb-2"><span className="font-medium text-gray-600">Frecuencia Respiratoria:</span> {triage.signosVitales.frecuenciaRespiratoria}</p>
                                                <p className="  mb-2"><span className="font-medium text-gray-600">Presion Arterial:</span> {triage.signosVitales.presionArterial}</p>
                                                <p className="  mb-2"><span className="font-medium text-gray-600">Saturación Oxigeno:</span> {triage.signosVitales.saturacionOxigeno}</p>
                                                <p className="  mb-2"><span className="font-medium text-gray-600">Temperatura:</span> {triage.signosVitales.temperatura}</p>
                                            </> 
                                            : "--"}
                                    </td>
                                </tr>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                        Estado del Paciente
                                    </th>
                                    <td className="px-6 py-4">
                                        {triage 
                                            ? <>
                                                <p className="  mb-2"><span className="font-medium text-gray-600">Estado Respiratorio:</span> {triage.estadoPaciente.estadoRespiratorio}</p>
                                                <p className="  mb-2"><span className="font-medium text-gray-600">Nivel de Consciencia:</span> {triage.estadoPaciente.nivelConsciencia}</p>
                                                <p className="  mb-2"><span className="font-medium text-gray-600">Dolor:</span> {triage.estadoPaciente.dolor}</p>
                                                <p className="  mb-2"><span className="font-medium text-gray-600">Color de Piel:</span> {triage.estadoPaciente.colorPiel}</p>
                                            </> 
                                            : "--"}
                                    </td>
                                </tr>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                        Fecha de Ingreso
                                    </th>
                                    <td className="px-6 py-4">
                                        {triage ? fechaFormateada : "--"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="items-center justify-between flex sm:space-x-4 rtl:space-x-reverse">
                        <button type="button" onClick={() => darDeAlta()} className="font-medium rounded-lg text-base px-6 py-3.5  text-center text-green-700 border-green-700 hover:text-white border  hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:border-green-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                            Dar de Alta
                        </button>
                        {triage ? console.log(triage.consultorioAsignado) : <></>}
                        {!triage ? "" 
                            : triage.consultorioAsignado !== 0 ? <button type="button" className="disabled cursor-not-allowed px-6 py-3.5 text-base font-medium text-white rounded-lg text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Asignar Medico</button> 
                            : <button type="button" onClick={() => setTriage({...triage, consultorioAsignado: asignarConsultorio(nss)})} className="px-6 py-3.5 text-base font-medium text-white rounded-lg text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Asignar Medico</button>
                        }
                        {/*consultorio !== 0 
                            ? <button type="button" className="disabled cursor-not-allowed px-6 py-3.5 text-base font-medium text-white rounded-lg text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Asignar Medico</button>
                            : <button type="button" onClick={() => setConsultorio(asignarConsultorio(nss))} className="px-6 py-3.5 text-base font-medium text-white rounded-lg text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Asignar Medico</button>

                        */}
                    </div>
                </div>
            </article>
            <article className="flex-1 mx-2">
                <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 py-2 text-3xl font-bold text-gray-900 dark:text-white">Información del Paciente</h5>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <tbody>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                        Nombre
                                    </th>
                                    <td className="px-6 py-4">
                                        {pacienteData ? pacienteData.nombre : "--"}
                                    </td>
                                </tr>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                        Edad
                                    </th>
                                    <td className="px-6 py-4">
                                        {pacienteData ? pacienteData.edad : "--"}
                                    </td>
                                </tr>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                        Sexo
                                    </th>
                                    <td className="px-6 py-4">
                                        {pacienteData ? pacienteData.sexo : "--"}
                                    </td>
                                </tr>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                        Dirección
                                    </th>
                                    <td className="px-6 py-4">
                                        {pacienteData ? pacienteData.direccion : "--"}
                                    </td>
                                </tr>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                        Historial Medico
                                    </th>
                                    <td className="px-6 py-4">
                                        {pacienteData ? pacienteData.historialMedico.map((hd, index) => (<p key={index}>{hd}</p>)) : "--"}
                                    </td>
                                </tr>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                        Contacto de Emergencia
                                    </th>
                                    <td className="px-6 py-4">
                                        {pacienteData 
                                            ? <>
                                                <p>{pacienteData.contactoEmergencia.nombre}</p>
                                                <p>{pacienteData.contactoEmergencia.relacion}</p>
                                                <p>{pacienteData.contactoEmergencia.telefono}</p>
                                                <p>{pacienteData.contactoEmergencia.direccion}</p>
                                            </>
                                            
                                            : "--"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                        <button onClick={() => navigate(`/edit/${nss}`)} type="button" className="px-6 py-3.5 text-base font-medium text-white rounded-lg text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Editar
                        </button>
                    </div>
                </div>
            </article>
        </main>
    </>
}