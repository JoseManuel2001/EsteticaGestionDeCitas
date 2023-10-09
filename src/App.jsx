import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import Header from './Header';
import '../src/Styles/App.css';

function App() {
    const [data, setData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date()); // Inicializa el DatePicker con la fecha actual
    const navigate = useNavigate();

    const handleClickAgregar = () => {
        navigate("/Registrar");
    };

    const handleClickEditar = (id) => {
        navigate(`/editarCitas/${id}`);
    };

    const handleEliminarUsuario = (id) => {
        // Realizar una solicitud DELETE para eliminar el usuario
        axios.delete(`http://172.27.98.6:1337/api/citas/${id}`)
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
                const filteredCitas = response.data.data.filter(user => {
                    const citaFecha = user.attributes.Fecha.split('T')[0];
                    return citaFecha === formattedDate;
                });
                const mappedUsers = filteredCitas.map(user => ({
                    id: user.id,
                    Nombre: user.attributes.Nombre,
                    Servicio: user.attributes.Servicio,
                    Horario: user.attributes.Horario,
                    Costo: user.attributes.Costo,
                    Fecha: user.attributes.Fecha,
                }));
                setData(mappedUsers);
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
                        {data.map((user) => (
                            <tr key={user.id}>
                                <td>{user.Nombre}</td>
                                <td className='td1'>{user.Servicio}</td>
                                <td>{user.Horario}</td>
                                <td>{user.Costo}</td>
                                <td>{user.Fecha}</td>
                                <td className='Botones'>
                                    <button onClick={() => handleClickEditar(user.id)}>Editar</button>
                                    <button onClick={() => handleEliminarUsuario(user.id)}>Eliminar</button>
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


