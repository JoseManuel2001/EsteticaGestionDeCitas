// Importa las librerías y componentes necesarios
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Header from './Header';
import { UserContext } from './UserContext'; // Importa el contexto de usuario
import '../src/Styles/App.css';

// Define el componente principal
function App2() {
    // Estados y funciones del componente
    const [data, setData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { user } = useContext(UserContext); // Obtiene el usuario autenticado del contexto
    const navigate = useNavigate();

    // Función para manejar la redirección a la página de registro de citas
    const handleClickAgregar = () => {
        navigate("/Registrar");
    };

    // Función para manejar la redirección a la página de edición de citas
    const handleClickEditar = (id) => {
        navigate(`/editarCitas/${id}`);
    };

    // Función para eliminar una cita
    const handleEliminarUsuario = (id) => {
        axios.delete(`http://localhost:1337/api/citas/${id}`)
            .then(response => {
                console.log("Cita Eliminada:", response.data);
                setData(prevData => prevData.filter(user => user.id !== id));
            })
            .catch(error => {
                console.error('Error al eliminar la cita:', error);
            });
    };


    // Efecto que se ejecuta al cambiar la fecha seleccionada
    useEffect(() => {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        axios.get('http://localhost:1337/api/citas')
            .then(response => {
                // Filtra las citas para mostrar solo las del día seleccionado
                const filteredCitas = response.data.data.filter(cita => {
                    const citaFecha = cita.attributes.Fecha.split('T')[0];
                    return citaFecha === formattedDate;
                });
                const mappedCitas = filteredCitas.map(cita => ({
                    id: cita.id,
                    userId: cita.attributes.userId,
                    Nombre: cita.attributes.Nombre,
                    Servicio: cita.attributes.Servicio,
                    Horario: cita.attributes.Horario,
                    Costo: cita.attributes.Costo,
                    Fecha: cita.attributes.Fecha,
                    Rol: cita.attributes.Role,
                }));
                
                setData(mappedCitas);
            })
            .catch(error => {
                console.error('Error al obtener datos:', error);
            });
    }, [selectedDate]);

    // Renderizado del componente
    return (
        <>
            {/* Encabezado de la aplicación */}
            <Header title='Citas' desc='Lista de citas'/>

            {/* Contenido principal */}
            <div className="App">
                <label> Selecciona el día</label>
                <DatePicker className="Date" selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
                <button className='Button' onClick={handleClickAgregar}>Añadir</button>
                <table className='UsuariosT'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th className='th1'>Servicio</th>
                            <th>Horario</th>
                            <th>Costo</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((cita) => (
                            <tr key={cita.id}>
                                <td>{cita.Nombre}</td>
                                <td className='td1'>{cita.Servicio}</td>
                                <td>{cita.Horario}</td>
                                <td>{cita.Costo}</td>
                                <td>{cita.Fecha}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            
        </>
    );
}

// Exporta el componente principal
export default App2;
