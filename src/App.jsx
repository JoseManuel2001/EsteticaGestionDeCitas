import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Header from './Header';
import { UserContext } from './UserContext'; // Importa el contexto de usuario
import '../src/Styles/App.css';

function App() {
    const [data, setData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { user } = useContext(UserContext); // Obtén el usuario autenticado del contexto
    const navigate = useNavigate();

    const handleClickAgregar = () => {
        navigate("/Registrar");
    };

    const handleClickEditar = (id) => {
        navigate(`/editarCitas/${id}`);
    };

    const handleEliminarUsuario = (id) => {
        // Realizar una solicitud DELETE para eliminar el usuario
        axios.delete(`http://localhost:1337/api/citas/${id}`)
            .then(response => {
                console.log("Cita Eliminada:", response.data);
                setData(prevData => prevData.filter(user => user.id !== id));
            })
            .catch(error => {
                console.error('Error al eliminar la cita:', error);
            });
    };

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
                    userId: cita.attributes.userId, // Suponiendo que este es el campo que indica el ID del usuario que creó la cita
                    Nombre: cita.attributes.Nombre,
                    Servicio: cita.attributes.Servicio,
                    Horario: cita.attributes.Horario,
                    Costo: cita.attributes.Costo,
                    Fecha: cita.attributes.Fecha,
                }));
                setData(mappedCitas);
            })
            .catch(error => {
                console.error('Error al obtener datos:', error);
            });
    }, [selectedDate]);

    return (
        <>
            <Header title='Citas' desc='Lista de citas'/>
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
                                <td className='Botones'>
                                    {user && user.id === cita.userId && ( // Muestra botones solo si el usuario autenticado creó la cita
                                        <>
                                            <button onClick={() => handleClickEditar(cita.id)}>Editar</button>
                                            <button onClick={() => handleEliminarUsuario(cita.id)}>Eliminar</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default App;



