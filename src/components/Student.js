import React, {useEffect, useState} from 'react';
import {Button, Container, Input, Table} from 'reactstrap'
import axios from 'axios';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {show_alert} from '../functions/functions';

const Student = () => {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responce = await axios.get('http://localhost:31000/student/api/');
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

    return (
        <>
            <p>formulario</p>
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
                        <td>#</td>
                        <td>
                            <div className="col-sm-10">
                                <Input type="text" className="form-control" placeholder="Nombre"/>
                            </div>
                        </td>
                        <td>
                            <div className="col-sm-10">
                                <Input type="text" className="form-control" placeholder="Apellido"/>
                            </div>
                        </td>
                        <td>
                            <div className="col-sm-10">
                                <Input type="text" className="form-control" placeholder="Edad"/>
                            </div>
                        </td>
                        <td>
                            <div className="col-sm-10">
                                <Input type="text" className="form-control" placeholder="Email"/>
                            </div>
                        </td>
                        <td>
                            <div className="col-sm-10">
                                <Input type="text" className="form-control" placeholder="Ciudad" aria-label="Names"/>
                            </div>
                        </td>
                        <td>
                            <div className="col-sm-10">
                                <Input type="text" className="form-control" placeholder="zona/horaria"
                                       aria-label="Names"/>
                            </div>
                        </td>
                        <td colSpan="3"><center><Button color="success">Guardar</Button></center></td>
                    </tr>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.nombre}</td>
                            <td>{student.apellido}</td>
                            <td>{student.edad}</td>
                            <td>{student.email}</td>
                            <td>{student.ciudad}</td>
                            <td>{student.zonaHoraria}</td>
                            <td>
                                <Button color="primary">Editar</Button>
                            </td>
                            <td>  <Button color="danger">Editar</Button></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default Student;