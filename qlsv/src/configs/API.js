import axios from "axios";
import cookies from 'react-cookies'

export const endpoints = {
    "classs": "/classs/",
    "classs-student":(classsId) => `/classs/${classsId}/student/`,
    "lecturers": "/lecturers/",
    "students": "/students/",
    "news":"/news/",
    "newss":"/newss/",
    "news-detail": (newsId) => `/news/${newsId}/`,
    "like-news": (newsId) => `/news/${newsId}/like/`,
    "news-comments": (newsId) => `/news/${newsId}/comments/`,
    "add-comments": (newsId) => `/news/${newsId}/add-comments/`,
    "student":(studentId) => `/student/${studentId}/`,
    "student-addscores":(studentId) => `/student/${studentId}/add-scores/`,
    "subject": "/subject/",
    "scores":"//scores/",
    "comments": "/comments/",
    'users': '/users/',
    "login": "/o/token/",
    "current-user" : "/users/current-user/",
}
export const authApi = () => axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
        'Authorization': `Bearer ${cookies.load('access_token')}`
    }
})
export default axios.create({
    baseURL: " http://127.0.0.1:8000/"
})