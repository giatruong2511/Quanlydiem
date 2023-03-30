import React, { memo } from 'react'
import { Nav, Navbar } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { Card, List, Avatar, Button } from 'antd';
import "../static/news.css";
import Moment from "react-moment"

const Item = (props) => {
    const nav = useNavigate()
    const gotoNews = (evt) => {
        evt.preventDefault()
        nav(`/news/${props.id}`)
    }

    return (   
        <List.Item className='news'>
          <Card className='card'>
          <a href='#' onClick={gotoNews}>
            <Card.Meta
            
              avatar={<Avatar src={props.avatar} />}
              title={props.author}
            />
            
            <div className='moment'><Moment fromNow>{props.created_date}</Moment></div>
            <br></br>
            <h5 className='text-success'>{props.topic}</h5>
            <p dangerouslySetInnerHTML={{__html: props.content}}></p>
            <hr></hr>
            <Button type="link" size="small" onClick={gotoNews}>Like</Button>
            <Button type="link" size="small" onClick={gotoNews}>Comment</Button>
            <Button type="link" size="small">Share</Button>
            </a>
          </Card>
        <br></br>
        </List.Item>
        
        
    )
}

export default memo(Item)