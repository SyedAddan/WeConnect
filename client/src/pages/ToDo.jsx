import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar'
import moment from 'moment'
import axios from 'axios'
import { Checkbox } from '@mui/material'

import Table from '../components/table/Table'

const updateTodo = async (task, status) => {
    await axios.post(
        '/todo/updatetodo', {
            task: task,
            status: status
        }
    )
}

const renderToDoHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderToDoList = (item, index) => (
    <tr key={index}>
        <td>{item.task}</td>
        <td>{item.description}</td>
        <Checkbox
            checked={item.status && true}
            onChange={(e) => {
                    e.preventDefault()
                    updateTodo(item.task, item.status)
                    item.status = !item.status
                }
            }
        />
        <td>{moment(item.duedate).format('dddd, MMMM Do YYYY, h:mm:ss a')}</td>
    </tr>
)

const pushToDo = async (mail, task, description, status, duedate) => {
    await axios.post(
        "/todo/addtodo", {
        mail: mail,
        task: task,
        description: description,
        status: status,
        duedate: duedate
    }
    )
}

const ToDo = () => {
    const [head] = useState([
        "Task",
        "Descirption",
        "Status",
        "Due Date"
    ])
    const [body, setBody] = useState([])
    const [user, setUser] = useState({})
    const [task, setTask] = useState('')
    const [description, setDescription] = useState('')
    const status = false
    const [time, setTime] = useState('')
    const [duedate, setDuedate] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const loginUser = async () => {
            setUser(await axios.get('/getLoginUser'))
        }
        loginUser()

        const getTodos = async () => {
            const tempBody = []
            const { data } = await axios.get('/todo/gettodo')
            data.forEach((todo) => {
                if (todo.userMail === user?.data?.userMail) {
                    const oneTodo = {
                        task: todo.task,
                        description: todo.description,
                        status: todo.status,
                        duedate: todo.duedate
                    }
                    body.push(oneTodo)
                }
            })
            setBody(tempBody)
        }
        getTodos()
    }, [body, user])

    return (
        <div>
            <h2 className="page-header">ToDos</h2>
            <div className="todolist">
                <div>
                    <div className='card'>
                        <div>
                            <h2>All ToDos</h2>
                        </div>
                        <div className='card'>
                            <Table
                                headData={head}
                                renderHead={(item, index) => renderToDoHead(item, index)}
                                bodyData={body}
                                renderBody={(item, index) => renderToDoList(item, index)}
                            />
                        </div>
                    </div>
                    <div className='card'>
                        <div>
                            <h2>Add ToDo</h2>
                        </div>
                        <br></br>
                        <br></br>
                        <div className='card-body'>
                            <div className='card'>
                                <div className="row">
                                    <div className="col-6">
                                        <label><b>Task: </b></label>
                                        <input onChange={
                                            (e) => {
                                                setTask(e.target.value)
                                                setError("")
                                            }
                                        } type="text" />
                                    </div>
                                    <div className="col-6">
                                        <label><b>Description: </b></label>
                                        <input onChange={
                                            (e) => {
                                                setDescription(e.target.value)
                                                setError("")
                                            }
                                        } type="text" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-9">
                                    <div className="card">
                                        <h3>Select a Date!</h3>
                                        <br></br>
                                        <Calendar
                                            value={duedate}
                                            onChange={setDuedate}
                                        />
                                        <br></br>
                                        <p>Current selected date is <b>{moment(duedate).format('MMMM Do YYYY')}</b></p>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="card">
                                        <h3>Select a Time!</h3>
                                        <br></br>
                                        <form>
                                            <label for="stime">Due Time:</label>
                                            <input type="time" name="stime" onChange={
                                                (e) => {
                                                    setTime(e.target.value)
                                                    setError("")
                                                }
                                            } />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="button-primary" onClick={(e) => {
                            e.preventDefault()
                            if (task === "" || description === "") {
                                if (task === "") {
                                    setError("Task Can't be empty!")
                                } else if (description === "") {
                                    setError("Description Can't be empty!")
                                } else {
                                    setError("Soemthing went Wrong!")
                                }
                            } else {
                                try {
                                    duedate.setHours(parseInt(time.slice(0, 2)), parseInt(time.slice(3, 5)))
                                    pushToDo(user.data.userMail, task, description, status, duedate.toISOString())
                                    setError("")
                                    window.location.reload()
                                } catch {
                                    setError("Please Enter Date and Time Correctly!")
                                }
                            }
                        }}>
                            Add
                        </button>
                        {
                            error && <p>{error}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToDo