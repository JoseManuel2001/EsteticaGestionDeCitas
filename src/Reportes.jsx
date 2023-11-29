import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import '../src/Styles/Reportes.css';
import { useNavigate } from 'react-router-dom';

function Reportes() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Lógica para obtener datos de reportes, ajusta la URL según tus necesidades
    axios.get('http://localhost:1337/api/citas')
      .then(response => {
        const reportesData = response.data.data.map(report => ({
          id: report.id,
          Nombre: report.attributes.Nombre,
          Servicio: report.attributes.Servicio,
          Horario: report.attributes.Horario,
          Costo: report.attributes.Costo,
          Fecha: report.attributes.Fecha,
        }));
        setData(reportesData);
      })
      .catch(error => {
        console.error('Error al obtener datos de reportes:', error);
      });
  }, []);

  // Lógica para calcular los 3 usuarios que más asisten y el total de dinero gastado
  const calcularReporteTopUsuarios = () => {
    const usuariosAsistentes = {};
    let totalDineroGastado = 0;

    // Contabilizar asistencias y calcular el total de dinero gastado
    data.forEach(reporte => {
      const { Nombre, Costo } = reporte;
      if (!usuariosAsistentes[Nombre]) {
        usuariosAsistentes[Nombre] = {
          asistencias: 0,
          totalGastado: 0,
        };
      }
      usuariosAsistentes[Nombre].asistencias += 1;
      usuariosAsistentes[Nombre].totalGastado += parseFloat(Costo);
      totalDineroGastado += parseFloat(Costo);
    });

    // Ordenar usuarios por asistencias de mayor a menor
    const usuariosOrdenados = Object.keys(usuariosAsistentes).sort((a, b) => {
      return usuariosAsistentes[b].asistencias - usuariosAsistentes[a].asistencias;
    });

    // Obtener los 3 usuarios con más asistencias
    const topUsuarios = usuariosOrdenados.slice(0, 3).map(usuario => ({
      nombre: usuario,
      asistencias: usuariosAsistentes[usuario].asistencias,
      totalGastado: usuariosAsistentes[usuario].totalGastado.toFixed(2),
    }));

    return { topUsuarios, totalDineroGastado };
  };

  const { topUsuarios, totalDineroGastado } = calcularReporteTopUsuarios();

  return (
    <>
      <Header title='Reportes' desc='Reportes de usuarios y servicios' />
      <div className="Reportes">
        <h2>Top 3 Usuarios con más asistencias:</h2>
        <ul>
          {topUsuarios.map(usuario => (
            <li key={usuario.nombre}>
              {usuario.nombre}: {usuario.asistencias} asistencias, Total Gastado: ${usuario.totalGastado}
            </li>
          ))}
        </ul>
        <h2>Total de dinero gastado por todos los usuarios: ${totalDineroGastado}</h2>

        <h2>Detalles de todas las asistencias:</h2>
        <table className='ReportesT'>
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
            {data.map((reporte) => (
              <tr key={reporte.id}>
                <td>{reporte.Nombre}</td>
                <td className='td1'>{reporte.Servicio}</td>
                <td>{reporte.Horario}</td>
                <td>{reporte.Costo}</td>
                <td>{reporte.Fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={() => navigate('/App')}>Regresar</button>
    </>
  );
}

export default Reportes;



