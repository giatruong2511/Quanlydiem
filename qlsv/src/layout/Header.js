import React, { useState, useContext, memo, useEffect } from "react";
import { Form, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import { Card, Avatar } from 'antd';
import "../static/header.css";
import logo from "../static/image/logo.png"
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { UserContext } from "../App";
import cookies from 'react-cookies'
import API, { authApi, endpoints } from '../configs/API'



function Header() {
  const nav = useNavigate()
  const [user, dispatch] = useContext(UserContext)
  const [students, setStudents] = useState([])


  const logout = (evt) => {
    evt.preventDefault()
    cookies.remove('access_token')
    cookies.remove('current-user')
    dispatch({ "type": "logout" })
    nav(`/login/`)
  }

  useEffect(() => {
    let loadStudent = async () => {
      let res;
      if (user !== null) {
        res = await authApi().get((endpoints['students']));
      } else {
        res = await API.get(endpoints['students'])
      }
      setStudents(res.data)
      console.info(res.data)
    }

    loadStudent()
  }, [])
  const gotostudent = (evt) => {
    evt.preventDefault()
    if(students !== null)
    {
      nav(`/student/${students[0].id}`)
    }
    else
      nav(`/`)
  }
  let btn = <Link className="link" to="/login"><FontAwesomeIcon icon={faUser} /></Link>
  btn = <>
    <NavDropdown title={<FontAwesomeIcon icon={faUser} />}>
      <NavDropdown.Item><Link to="/login" className="nav-link text-danger">Dang nhap</Link></NavDropdown.Item>
      <NavDropdown.Item><Link to="/register" className="nav-link text-danger">Dang ky</Link></NavDropdown.Item>
    </NavDropdown>
  </>
  if (user != null)
    btn = <>
      <NavDropdown title={<FontAwesomeIcon icon={faUser} />}>
        <NavDropdown.Item><Link to="/" className="nav-link text-danger">{user.username}</Link></NavDropdown.Item>
        <NavDropdown.Item><a href="#" onClick={logout} className="nav-link">Dang xuat</a></NavDropdown.Item>
      </NavDropdown>
    </>

  return (
    <div className="header">
      <Navbar bg="myBg" expand="sm" sticky="top" collapseOnSelect>
        <Navbar.Brand>
          Quản lý điểm sinh viên
        </Navbar.Brand>
        <Navbar.Toggle className="coloring" />
        <Navbar.Collapse>
          <Nav>
            <Navbar><Link className="link" to="/">Bảng tin </Link></Navbar>
            {user != null && user.role && user.role === 2 && <Navbar ><Link className="link" to="/lecturer/">Quản lý điểm</Link></Navbar>}
            {user != null && user.role && user.role === 3 && <Navbar onClick={gotostudent}><Link className="link" >Danh sách môn</Link></Navbar>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Navbar className="bg2">

        <Navbar className="DN">
          {user != null && <Card.Meta
            avatar={<Avatar src={user.avatar_path} />}
          />}
          {btn}</Navbar>
      </Navbar>

    </div>
  )
}

export default memo(Header)