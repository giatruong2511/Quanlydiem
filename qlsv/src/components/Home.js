import { useContext, useEffect, useState } from "react"
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import API, { endpoints } from "../configs/API"
import Item from "../layout/item";

const Home = () => {
    const [news, setNews] = useState([])
    const [user] = useContext(UserContext)
    const nav = useNavigate()
    useEffect(() => {
        const loadNews = async () => {
            let res = await API.get(endpoints['news'])
            setNews(res.data)
            console.info(res.data)
        }
        
        loadNews()
        
    }, [])
    const gotoAddNews = (evt) => {
        evt.preventDefault()
        nav(`/news/add-news/`)
    }
    return (
        <Container>
            
            <h1 className="text-center text-danger" >Bảng tin</h1>
            <br></br>
            {user != null &&<Button type="link" class="btn btn-primary" onClick={gotoAddNews}>
                Thêm bài viết
            </Button>}
            <br></br>
            <br></br>
            <Nav>
                {news.map(c => {
                    return <Item id={c.id} avatar={c.user.avatar} author = {c.user.username} content={c.content} topic = {c.topic} created_date ={c.created_date}/>
                })}
            </Nav>
        </Container>
    )
}

export default Home