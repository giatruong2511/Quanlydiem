import React, { useState, useContext } from 'react'
import { Form, Button, Container , Alert} from 'react-bootstrap'
import { UserContext } from '../App'
import { Navigate, useNavigate } from 'react-router-dom'
import API, { authApi, endpoints } from '../configs/API'
import cookies from 'react-cookies'


const AddNews = () => {
    const [user] = useContext(UserContext)
    const [topic, settopic] = useState('');
    const [content, setContent] = useState('');
    const nav = useNavigate()

    const addnews = async (event) => {
        event.preventDefault();

        try {
            const res = await authApi().post(endpoints['newss'], {
                'content': content,
                'topic': topic,
                'user':user.id
        });

        console.log(res.data);
        nav(`/`)
        } catch (error) {
        console.error(error);
        }
    };
    return (
        <Container>
            <h1 className="text-center text-danger">Thêm bài viết</h1>
            <Form onSubmit={addnews}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Chủ đề</Form.Label>
                <Form.Control type="text"  value={topic} onChange={(e) => settopic(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nội Dung</Form.Label>
                <Form.Control as="textarea" rows={3}  value={content} onChange={(e) => setContent(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Đăng
            </Button>
            </Form>
        </Container>
    )
    
}

export default AddNews