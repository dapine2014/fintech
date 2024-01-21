import React, {useEffect, useState} from 'react';
import {Button, Container, Input, Table} from 'reactstrap'
import {formDataEstudent,clearDataEstuden,editDataStuden} from '../functions/functions'
import axios from 'axios';

const Student = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responce = await axios.get("http://localhost:31000/student/api/");
                if (responce.data.succes === 200) {
                    setStudents(responce.data.data);

                } else {
                    console.error('Error al obtener datos:', responce.data.message);
                }

            } catch (error) {
                console.error('Error', error.message);
            }
        };
        fetchData();
    }, []);


    const StudenDataStatus = async () => {
        try {
            const formData = formDataEstudent();
            const response = await axios.post('http://localhost:31000/student/api/saveupdate', formData);
            if (response.data.succes === 200) {

                // Actualizar el estado local sin realizar otra solicitud GET
                const updatedStudents = [...students];
                const existingStudentIndex = updatedStudents.findIndex(
                    (student) => student.id === response.data.data.id
                );

                if (existingStudentIndex !== -1) {
                    // Si el estudiante ya existe en el array, actualiza sus datos
                    updatedStudents[existingStudentIndex] = response.data.data;
                } else {
                    // Si el estudiante no existe en el array, agrégalo
                    updatedStudents.push(response.data.data);
                }

                setStudents(updatedStudents);
                clearDataEstuden();
                console.log('Estudiante guardado exitosamente');
            } else {
                console.error('Error al guardar el estudiante:', response.data.message);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud POST:', error.message);
        }
    };


    return (
        <>
            <Container>
                <Table className="table table-borderless" border="1">
                    <thead>
                    <tr>
                        <th className="table-secondary" colSpan="11">Crear una cuenta market
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td align="center">
                            <div className="col-sm-4">
                                <Input id="id" type="text" className="form-control-plaintext" placeholder="#" readOnly/>
                            </div>
                        </td>
                        <td align="center">
                            <div className="col-sm-10">
                                <Input id="nombre" type="text" className="form-control" placeholder="Nombre"/>
                            </div>
                        </td>
                        <td align="center">
                            <div className="col-sm-10">
                                <Input id="apellido" type="text" className="form-control" placeholder="Apellido"/>
                            </div>
                        </td>
                        <td align="center">
                            <div className="col-sm-10">
                                <Input id="edad" type="text" className="form-control" placeholder="Edad"/>
                            </div>
                        </td>
                        <td align="center">
                            <div className="col-sm-10">
                                <Input id="email" type="text" className="form-control" placeholder="Email"/>
                            </div>
                        </td>
                        <td align="center">
                            <div className="col-sm-10">
                                <Input id="ciudad" type="text" className="form-control" placeholder="Ciudad"/>
                            </div>
                        </td>
                        <td colSpan="3" align="center">
                            <center><Button color="success" onClick={() => StudenDataStatus()  }>Guardar</Button></center>
                        </td>
                    </tr>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td align="center">{student.id}</td>
                            <td align="center">{student.nombre}</td>
                            <td align="center">{student.apellido}</td>
                            <td align="center">{student.edad}</td>
                            <td align="center">{student.email}</td>
                            <td align="center">{student.ciudad}</td>
                            <td>
                                <Button color="primary" onClick={()=>editDataStuden(student.id,
                                                                                         student.nombre,
                                                                                         student.apellido,
                                                                                         student.edad,
                                                                                         student.email,
                                                                                         student.ciudad)   }>Editar</Button>
                            </td>
                            <td>
                                <Button color="danger">Borrar</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default Student;