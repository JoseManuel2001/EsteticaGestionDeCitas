import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

function App() {
    var today = new Date();

    // obtener la fecha de hoy en formato `MM/DD/YYYY`
    var now = today.toLocaleDateString('en-US');
    console.log(now);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);

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
                console.log("CitaEliminada:", response.data);
                // Actualizar la lista de usuarios después de eliminar
                setData(prevData => prevData.filter(user => user.id !== id));
            })
            .catch(error => {
                console.error('Error al eliminar la cita:', error);
            });
    };

    useEffect(() => {
        // Realizar la solicitud GET cuando el componente se monta
        axios.get('http://localhost:1337/api/citas')
            .then(response => {
                // Almacenar los datos en el estado
                const mappedUsers = response.data.data.map((user) => ({
                    id: user.id, // Asegúrate de incluir el ID del usuario
                    Nombre: user.attributes.Nombre,
                    Servicio: user.attributes.Servicio,
                    Horario: user.attributes.Horario,
                    Costo: user.attributes.Costo,
                }));
                setData(mappedUsers);
            })
            .catch(error => {
                console.error('Error al obtener datos:', error);
            });
    }, []); // El segundo argumento [] asegura que el efecto se ejecute solo una vez, similar a componentDidMount

    return (
        <>
            <div className="App">
                <label> Selecciona el dia</label>
                <DatePicker className="Date" selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
                
                <>
                <button className='Button' onClick={handleClickAgregar}>Añadir</button>
                <table className='UsuariosT'>
                    <thead >
                        <tr>
                            <th>Nombre</th>
                            <th className='th1'>Servicio</th>
                            <th>Horario</th>
                            <th>Costo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user) => (
                            <tr key={user.id}>
                                <td>{user.Nombre}</td>
                                <td className='td1'>{user.Servicio}</td>
                                <td>{user.Horario}</td>
                                <td>{user.Costo}</td>
                                <td className='Botones'>
                                    <button onClick={() => handleClickEditar(user.id)}>Editar</button>
                                    <button onClick={() => handleEliminarUsuario(user.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </>
            </div>
        </>
    );
}

export default App;