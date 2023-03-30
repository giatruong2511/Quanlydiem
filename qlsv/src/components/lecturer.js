import React, { useState, useContext, useEffect } from 'react'
import { Form, Button, Container, Alert, Navbar } from 'react-bootstrap'
import { UserContext } from '../App'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import API, { authApi, endpoints } from '../configs/API'
import cookies from 'react-cookies'
import moment from 'moment';



const Lecturer = () => {
    const [user] = useContext(UserContext)
    const [lecturer, setLecturer] = useState([])
    const nav = useNavigate()

    useEffect(() => {
        let loadLecturer = async () => {
            let res;
            if (user !== null) {
                res = await authApi().get((endpoints['lecturers']));
            } else {
                res = await API.get(endpoints['lecturers'])
            }
            setLecturer(res.data)
            console.info(res.data)
        }

        loadLecturer()
    }, [])
    return (
        <>
            <h1 className="text-center text-danger">Quản lý </h1>
            {lecturer.map(c => {

                return (
                    <>
                        <h3 className='text-primary'>Thông tin giảng viên </h3>
                        <h6>Họ và tên: {c.name}</h6>
                        <h6>Mã giảng viên: {c.lecturer_id}</h6>
                        <h6>Giới tính: {c.sex}</h6>
                        <h6>Ngày sinh: {moment(c.date_of_birth).format('DD/MM/YYYY')}</h6>
                        <h6>Danh sách lớp quản lý: </h6>

                        {c.classs_lecturer.map((cl) => {
                            const gotoclass = (evt) => {
                                evt.preventDefault()
                                nav(`/classs/${cl.classs.id}/student/`)
                            }
                            return (
                                <>
                                <Button  type="link" class="btn btn-primary" onClick={gotoclass} >
                                    {cl.classs.name}
                                </Button>
                                <i style={{ margin: '18px' }}></i>
                                </>
                            )
                        })}
                    </>
                )
            })}
        </>
    )

}

export default Lecturer