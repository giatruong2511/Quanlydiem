import React, { useState, useContext } from 'react'
import { UserContext } from '../App'
import "../static/login.css"
import { Form, Button, Container, Alert, Row, Col, Navbar, ButtonToolbar, Nav } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import API, { authApi, endpoints } from '../configs/API'
import cookies from 'react-cookies'


const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [errMsg, setErrMsg] = useState(null)
    const [user, dispatch] = useContext(UserContext)

    const login = async (evt) => {
        evt.preventDefault() 
        
        try {
            const res = await API.post(endpoints['login'], {
                'client_id': 'LJTa4b8g7cg5zDrHjkkWYuenFO69CncOMgxJBkpN',
                'client_secret': 'LHxAowaOZeTgEGr5xHCEZpzmGTNUqwMm7mf0seAG8HqoooBmoiDrxKoJUCjEx9tNhA4aYlSwHGTkG7cFcglA8xiDD3NlzCegw5AiSWyWwgZ7xyLIHAUTEpohEqoXaFpK',
                'username': username,
                'password': password,
                'grant_type': 'password'
            })
    
            if (res.status === 200) {
                cookies.save('access_token', res.data.access_token)
    
                // lay current user
                const user = await authApi().get(endpoints['current-user'])
                cookies.save('current-user', user.data)
                dispatch({
                    "type": "login",
                    "payload": user.data
                })
            } 
        } catch (error) {
            console.info(error)
            setErrMsg('Username hoac password KHONG chinh xac!!!')
        }
    }


    if (user != null)
        return <Navigate to="/" />

    return (
        <div className='signin-main'>
            <div className='bg-cover'></div>
            <div className='signin'>
                <div className='signform'>
                    <section className='title'>ĐĂNG NHẬP</section>
                    {errMsg !== null && <Alert key='danger' variant='danger'>
                        {errMsg}
                    </Alert>}
                    <section className='signM'>
                        <Form onSubmit={login}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text"
                                    value={username}
                                    onChange={(evt) => setUsername(evt.target.value)}
                                    placeholder="Nhập username" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                    value={password}
                                    onChange={(evt) => setPassword(evt.target.value)}
                                    placeholder="Nhập Password" />
                            </Form.Group>
                            <Button className='submit' variant="primary" type="submit">
                                ĐĂNG NHẬP
                            </Button>
                        </Form>
                    </section>
                    <Row xs={2} className="row-account">
                        <Col>
                            <label class="switch" for="checkbox">
                                <input type="checkbox" id="checkbox" />
                                <div class="slider round"></div>
                            </label>
                            <span>Nhớ tài khoản</span>
                        </Col>
                        <Col><a className='qmk' href="#qmk">Quên mật khẩu?</a></Col>
                    </Row>
                    <section class="signM_bottom_bar clearfix">
                        <span>Bạn chưa có tài khoản? Đăng ký ngay!</span><Link to="/register">Dang ky</Link>
                    </section>
                </div>
            </div>
        </div>
    )
    
}

export default Login