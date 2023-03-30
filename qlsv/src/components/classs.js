import React, { useState, useContext, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { UserContext } from '../App'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import API, { authApi, endpoints } from '../configs/API'
import {Button } from 'antd';
import moment from 'moment';




const Classs = () => {
    const { classsId } = useParams()
    const [student, setstudent] = useState([])
    const nav = useNavigate()

    useEffect(() => {
        let loadstudent = async () => {
            let res;
            res = await API.get(endpoints['classs-student'](classsId))
            setstudent(res.data)
            console.info(res.data)
        }

        loadstudent()
    }, [])
    return (
        <>
            
            <h1 className="text-center text-danger">Danh sách sinh viên</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Họ và tên</th>
                        <th>MSSV</th>
                        <th>Giới tính</th>
                        <th>Email</th>
                        <th>Ngày sinh</th>
                        <th>Quê quán</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {student.map((c) => {
                        const gotostudent = (evt) => {
                            evt.preventDefault()
                            nav(`/student/${c.id}/`)
                        }
                        const gotoaddscores = (evt) => {
                            evt.preventDefault()
                            nav(`/student/${c.id}/add-scores`)
                        }
                        return(
                        <tr>
                            <td>{c.name}</td>
                            <td>{c.student_id} </td>
                            <td>{c.sex}</td>
                            <td>{c.email}</td>
                            <td>{moment(c.date_of_birth).format('DD/MM/YYYY')}</td>
                            <td>{c.hometown}</td>
                            <td><Button type="link" size="small" onClick={gotostudent}>Xem chi tiết</Button><br></br>
            <                   Button type="link" size="small" onClick={gotoaddscores}>Thêm điểm</Button>
                            </td>

                        </tr>
                        )
                        })}
                </tbody>
            </Table>

        </>
        )

}

export default Classs