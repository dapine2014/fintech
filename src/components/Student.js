import React, {useEffect, useState} from 'react';
import {Button, Container, Table} from 'reactstrap'

class Student extends React.Component {
    render() {
        return (
            <>
                <p>formulario</p>
                <Container>
                    <Table className="table table-borderless" border="1">
                        <thead>
                        <tr>
                            <th className="table-secondary" colspan="11">Crear una cuenta market</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>#</td>
                            <td>nombre</td>
                            <td>apellido</td>
                            <td>edad</td>
                            <td>email</td>
                            <td>ciudad</td>
                            <td>zona h</td>
                            <td><Button color="success">Guardar</Button></td>
                        </tr>
                        </tbody>
                    </Table>

                </Container>
                <Container>
                    <Table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>apellido</th>
                            <th>edad</th>
                            <th>email</th>
                            <th>ciudad</th>
                            <th>zona h</th>
                            <th>acciones</th>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </Table>
                </Container>
            </>
        )
    }
}

export default Student;