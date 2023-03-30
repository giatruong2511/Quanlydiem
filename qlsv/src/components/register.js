import React, { useRef, useState } from "react";
import "../static/login.css"
import { Form, Button, Container, Alert, Row, Col, Navbar, ButtonToolbar } from 'react-bootstrap'
import { Navigate, useNavigate} from 'react-router-dom'
import API, { endpoints } from "../configs/API";

const Register = () => {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const nav = useNavigate()
    const avatar = useRef()
    const [errMsg, setErrMsg] = useState(null)


    const Signup = (evt) => {
        evt.preventDefault()
        const singupUser = async () => {
            const formData = new FormData()
            formData.append("username", username)
            formData.append("password", password)
            formData.append("email", email)
            formData.append("first_name", firstName)
            formData.append("last_name", lastName)
            formData.append('avatar', avatar.current.files[0])

            
            const res = await API.post(endpoints['users'], formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            
            console.info(res.data)
            nav(`/login`)
        }
        if (password !== null && password === confirmPassword) {
            if(email !== null)
            {
                const mssv = email.slice(0, 10);
                const dcm = email.substring(email.indexOf("@"));
                const ten = email.substring(10, email.indexOf("@"));
                const pattern = /^[a-zA-Z]+$/;
                if(!isNaN(mssv) && dcm === '@ou.edu.vn'&& pattern.test(ten))
                {
                    singupUser()
                }
                else
                {
                    setErrMsg('Vui lòng nhập đúng địa chỉ email trường!!')
                }
            }
        }
        else
        {
            setErrMsg('Vui lòng nhập lại đúng mật khẩu!!')
        }
    }

    const gotoLogin = (evt) => {
        evt.preventDefault()
        nav(`/login`)
    }


    return (
        <div className='signin-main'>
            <div className='bg-cover'></div>
            <div className='register'>
                <div className='signform'>
                    <section className='title'>ĐĂNG KÝ</section>
                    {errMsg !== null && <Alert key='danger' variant='danger'>
                        {errMsg}
                    </Alert>}
                    <section className='signM'>
                        <Form onSubmit={Signup}>
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
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password"
                                    value={confirmPassword}
                                    onChange={(evt) => setConfirmPassword(evt.target.value)}
                                    placeholder="Confirm Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email"
                                    value={email}
                                    onChange={(evt) => setEmail(evt.target.value)}
                                    placeholder="Email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>avatar</Form.Label>
                                <Form.Control type="file" ref={avatar} />
                            </Form.Group>
                            <Row>
                                <Col xs={6}>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text"
                                            value={lastName}
                                            onChange={(evt) => setLastName(evt.target.value)}
                                            placeholder="Last Name" />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text"
                                            value={firstName}
                                            onChange={(evt) => setFirstName(evt.target.value)}
                                            placeholder="First Name" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button className='submit' variant="primary" type="submit">
                                ĐĂNG KÝ
                            </Button>
                        </Form>
                    </section>
                    <section class="signM_bottom_bar clearfix">
                        <span>Bạn đã có tài khoản? Đăng nhập ngay! </span><a href="#" onClick={gotoLogin}>Đăng Nhập</a>
                    </section>
                </div>
            </div>
        </div>
    )

}
export default Register

