import React, { useState, useContext, useEffect } from 'react'
import { Form, Button, Container, Alert, Navbar, Spinner,Table } from 'react-bootstrap'
import { UserContext } from '../App'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import API, { authApi, endpoints } from '../configs/API'
import cookies from 'react-cookies'
import moment from 'moment';



const Student = () => {
    const { studentId } = useParams()
    const [user] = useContext(UserContext)
    const [student, setstudent] = useState(null)
    const nav = useNavigate()

    useEffect(() => {
        const loadStudentById = async () => {
            let res = await API.get(endpoints['student'](studentId))

            setstudent(res.data)
            console.info(res.data)
        }

        loadStudentById()
    }, [])
    if (student === null)
        return <Spinner animation="grow" />

    return (
        <>
            
            
            <h1 className="text-center text-danger">Thông tin sinh viên </h1>
            <h6>Họ và tên: {student.name}</h6>
            <h6>Giới tính: {student.sex}</h6>
            <h6>Ngày sinh: {moment(student.date_of_birth).format('DD/MM/YYYY')}</h6>
            <h6>Email: {student.email}</h6>
            <h6>Danh sách môn: </h6>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Tên môn học</th>
                        <th>Mã môn</th>
                        <th>Số tín chỉ</th>
                        <th>Điểm giữa kỳ</th>
                        <th>Điểm cuối kỳ</th>
                        <th>Điểm 1</th>
                        <th>Điểm 2</th>
                        <th>Điểm 3</th>

                    </tr>
                </thead>
                <tbody>
                    {student.scores.map((c) => {
                        return (
                            <tr>
                                <td>{c.subject.name}</td>
                                <td>{c.subject.subject_id} </td>
                                <td>{c.subject.credits}</td>
                                <td>{c.midtern_scores}</td>
                                <td>{c.final_scores}</td>
                                <td>{c.extra_scores_1}</td>
                                <td>{c.extra_scores_2}</td>
                                <td>{c.extra_scores_3}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )

}

export default Student