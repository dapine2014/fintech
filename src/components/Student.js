import React, {useEffect, useState} from 'react';
import {Button, Container, Input, Table} from 'reactstrap'
import {formDataEstudent,clearDataEstuden,editDataStuden,showMessage} from '../functions/functions'
import axios from 'axios';
import withReactContent from "sweetalert2-react-content";
import validator from 'validator';
import Swal from "sweetalert2";

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
                    updatedStudents[existingStudentIndex] = response.data.data;
                    showMessage("Dato modificado con exito","success");
                } else {
                    // Si el estudiante no existe en el array, agrégalo
                    showMessage("Dato creado con exito","success");
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

    const deleteStudent = async (id, info) => {
        //const opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento : " + info);
        //const option = showConfirm("Estás Seguro que deseas Eliminar el elemento : "+ info, "question");

        const MySwal = withReactContent(Swal);
        let status = false;
        MySwal.fire({
            title: "Estás Seguro que deseas Eliminar el elemento : "+ info,
            icon:"question",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "SI",
            denyButtonText: "NO"
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                try {
                    const response = await axios.delete('http://localhost:31000/student/api/delete/' + id);
                    if (response.data.succes === 200) {
                        // Actualizar el estado local sin realizar otra solicitud GET
                        const updatedStudents = students.filter(student => student.id !== id);
                        setStudents(updatedStudents);
                        console.log('Estudiante eliminado exitosamente');
                        MySwal.fire("Estudiante eliminado exitosamente", "", "success");
                    }
                } catch (error) {
                    console.error('Error al realizar la solicitud DELETE:', error.message);
                }

            } else if (result.isDenied) {
                MySwal.fire("Cambio no efectuado", "", "info");
            }
        });
    };

    const  validarNumber = ()=> {
        console.log("entro "+ Number(document.getElementById("edad").value))
        document.getElementById("edad").value = isNaN(Number(document.getElementById("edad").value)) ? 0 : document.getElementById("edad").value;
    }

    const validarEmail = () =>{
       return validator.isEmail(document.getElementById("email").value);
    }

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
                                <Input id="edad" type="text" className="form-control" placeholder="Edad" onChange={()=>validarNumber()  }/>
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
                            <center><Button color="success" onClick={() => validarEmail() ? StudenDataStatus() : Swal.fire("correo invalido", "", "error") }>Guardar</Button></center>
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
                                <Button color="danger" onClick={() => deleteStudent(student.id, student.nombre+" "+student.apellido) }>Borrar</Button>
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