import { useContext, useEffect, useState } from "react"
import { Badge, Col, Container, Row, Spinner, Image, ListGroup, Form, Button } from "react-bootstrap"
import { Card, List, Avatar } from 'antd';
import { useParams } from "react-router-dom"
import { UserContext } from "../App"
import API, { authApi, endpoints } from "../configs/API"
import Moment from "react-moment"
import "../static/news.css";


const Post = () =>{
    const {newsId} = useParams()
    const [news, setNews] = useState(null)
    const [liked, setLiked] = useState(false)
    const [comments, setComments] = useState([])
    const [user] = useContext(UserContext)
    useEffect(() =>{
        const loadNewsById = async () => {
            let res;
            if (user !== null) {
                res = await authApi().get((endpoints['news-detail'](newsId)));
            } else {
                res = await API.get(endpoints['news-detail'](newsId))
            }
            console.info(res.data)
            setNews(res.data)
            setLiked(res.data.like)
            console.info(res.data)
        }
    
        loadNewsById()
    },[] )
    
    useEffect(() => {
        const loadComments = async () => {
            const res = await API.get(endpoints['news-comments'](newsId))
            setComments(res.data)
        }

        loadComments()
    }, [comments])
    const like = async () => {
        const res = await authApi().post(endpoints['like-news'](newsId))
        console.info(res)
        if (res.status === 200)
            setLiked(res.data.like)
    }
    
    let likeStatus = "outline-primary"
    if (liked === true)
        likeStatus = "primary"

    
    if (news === null)
        return <Spinner animation="grow" />

        return (
          <>
          <Container>
            <h3 className="text-center text-info">Bảng tin : {news.topic} </h3>
          </Container>
          
          <List.Item className='news'>
          <Card className='card'>
            <Card.Meta
            
              avatar={<Avatar src={news.user.avatar} />}
              title={news.user.username}
            />
            
            <div className='moment'><Moment fromNow>{news.created_date}</Moment></div>
            <br></br>
            <h5 className='text-success'>{news.topic}</h5>
            <p dangerouslySetInnerHTML={{__html: news.content}}></p>
            <hr></hr>
            <div>
            {user != null && <Button variant={likeStatus} onClick={like}>Like</Button>}
            </div>
            
          </Card>
        <br></br>
        </List.Item>
        <Row>
                    <Col>
                        {user != null && <CommentForm newsId={newsId} comments={comments} setComments={setComments} />}
                        <ListGroup>
                            {comments.map(c => <ListGroup.Item> 
                                <Image src={c.user.avatar} fluid width="50" roundedCircle /> <strong>{c.user.username}</strong>:  {c.content} - <Moment fromNow>{c.created_date}</Moment></ListGroup.Item>)}
                        </ListGroup>
                    </Col>
                </Row>
        </>
        )
}
const CommentForm = ({newsId, comments, setComments}) =>{
    const[content, setContent] = useState()
    const[user] = useContext(UserContext)

    const addComment = async (event) =>{
        event.preventDefault()

        const res = await authApi().post(endpoints['comments'], {
            'content': content,
            'news': newsId,
            'user':user.id
        })
        setComments([...comments, res.data])
        setContent("");
    }
    return(
        <Form onSubmit={addComment}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" value={content} onChange={(evt) => setContent(evt.target.value)} placeholder="Nhap binh luan" />
            </Form.Group>
        
            <Button class="btn btn-primary" type="submit">
                Them binh luan
            </Button>
        </Form>
    )
}
export default Post