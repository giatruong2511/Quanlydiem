import React from 'react';
import { Form, FormGroup, FormLabel, FormControl, DropdownButton, Dropdown, Button, Spinner, Alert } from 'react-bootstrap';
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";
import API, { authApi, endpoints } from "../configs/API"


const StudentScoreForm = () => {
    const { studentId } = useParams()
    const [subject, setsubject] = useState([])
    const nav = useNavigate()
    const [errMsg, setErrMsg] = useState(null)
    const [student, setstudent] = useState(null)
    const [selectedOption, setSelectedOption] = useState('');
    const [midtern_scores, setmidtern_scores] = useState('');
    const [final_scores, setfinal_scores] = useState('');
    const [extra_scores_1, setextra_scores_1] = useState(null);
    const [extra_scores_2, setextra_scores_2] = useState(null);
    const [extra_scores_3, setextra_scores_3] = useState(null);

    useEffect(() => {
        const loadStudentById = async () => {
            let res = await API.get(endpoints['student'](studentId))

            setstudent(res.data)
            console.info(res.data)
        }

        loadStudentById()
    }, [])

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    useEffect(() => {
        const loadSubject = async () => {
            let res = await API.get(endpoints['subject'])
            setsubject(res.data)
            console.info(res.data)
        }

        loadSubject()

    }, [])

    const addscores = async (evt) => {
        evt.preventDefault()

        try {
            if (student === null)
                return <Spinner animation="grow" />
            if (student !== null) {
                student.scores.map((c) => {
                    if (c.subject.id == selectedOption) {
                        console.info('3')
                        throw new Error("Invalid value");
                    }
                })
            }
            const res = await authApi().post(endpoints['student-addscores'](studentId), {
                'subject': selectedOption,
                'midtern_scores': midtern_scores,
                'final_scores': final_scores,
                'extra_scores_1': extra_scores_1,
                'extra_scores_2': extra_scores_2,
                'extra_scores_3': extra_scores_3,

            });

            console.log(res.data);
            nav(`/student/${studentId}/`)

        } catch (error) {
            setErrMsg('Môn học đã có điểm!!')
            console.error(error);
        }

    };

    return (
        <Form onSubmit={addscores}>
            {errMsg !== null && <Alert key='danger' variant='danger'>
                {errMsg}
            </Alert>}
            <label>
                Chọn môn học:

                <br></br>
                <select value={selectedOption} onChange={handleOptionChange} placeholder="Chọn môn học">
                    <option value="" disabled hidden>Chọn một môn học</option>
                    {subject.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </label>

            <FormGroup>
                <FormLabel>Điểm giữa kỳ:</FormLabel>
                <FormControl type="number" value={midtern_scores} onChange={(e) => setmidtern_scores(e.target.value)} placeholder="Nhập điểm giữa kỳ" />
            </FormGroup>

            <FormGroup>
                <FormLabel>Điểm cuối kỳ:</FormLabel>
                <FormControl type="number" value={final_scores} onChange={(e) => setfinal_scores(e.target.value)} placeholder="Nhập điểm cuối kỳ" />
            </FormGroup>

            <FormGroup>
                <FormLabel>Điểm 1:</FormLabel>
                <FormControl type="number" value={extra_scores_1} onChange={(e) => setextra_scores_1(e.target.value)} placeholder="Nhập điểm 1" />
            </FormGroup>

            <FormGroup>
                <FormLabel>Điểm 2:</FormLabel>
                <FormControl type="number" value={extra_scores_2} onChange={(e) => setextra_scores_2(e.target.value)} placeholder="Nhập điểm 2" />
            </FormGroup>

            <FormGroup>
                <FormLabel>Điểm 3:</FormLabel>
                <FormControl type="number" value={extra_scores_3} onChange={(e) => setextra_scores_3(e.target.value)} placeholder="Nhập điểm 3" />
            </FormGroup>
            <FormGroup>
                <br></br>
                <Button class="btn btn-primary" type="submit">
                    Thêm điểm
                </Button>
            </FormGroup>

        </Form>
    );
};

export default StudentScoreForm;
