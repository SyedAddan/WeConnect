import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import moment from 'moment'
import { Checkbox } from '@mui/material'
import axios from 'axios'

import Table from '../components/table/Table'

const availableTime = {
    head: [
        "From",
        "To",
        "People Free"
    ],
    body: [
        {
            starttime: "9:00 AM",
            endtime: "10:00 AM",
            count: "2"
        },
        {
            starttime: "10:00 AM",
            endtime: "11:00 AM",
            count: "1"
        },
        {
            starttime: "11:00 AM",
            endtime: "12:00 PM",
            count: "3"
        },
        {
            starttime: "12:00 PM",
            endtime: "1:00 PM",
            count: "2"
        },
        {
            starttime: "1:00 PM",
            endtime: "2:00 PM",
            count: "6"
        }
    ]
}

const updateMeet = async (id, status) => {
    await axios.put(
        '/meet/updatemeet', {
        id: id,
        status: status
    }
    )
}


const renderHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderAllBody = (item, index) => (
    <tr key={index}>
        <td>{item.by}</td>
        <td>{item.topic}</td>
        <td>{item.description}</td>
        <td>{moment(item.stime).format('MMMM Do YYYY, h:mm:ss a')}</td>
        <td>{moment(item.etime).format('MMMM Do YYYY, h:mm:ss a')}</td>
        <td>
            <Checkbox
                checked={item.status && true}
                onChange={(e) => {
                    e.preventDefault()
                    updateMeet(item.id, item.status)
                    item.status = !item.status
                }
                }
            />
        </td>
    </tr>
)

const pushMeet = async (by, topic, description, stime, etime, status) => {
    await axios.post(
        "/meet/addmeet", {
        by: by,
        topic: topic,
        description: description,
        stime: stime,
        etime: etime,
        status: status,
    }
    )
}

const renderAvailableBody = (item, index) => (
    <tr key={index}>
        <td>{item.starttime}</td>
        <td>{item.endtime}</td>
        <td>{item.count}</td>
    </tr>
)


const Meetings = () => {
    const [head] = useState([
        "Planned By",
        "Topic",
        "Description",
        "Start Time",
        "End Time",
        "Status"
    ])
    const [body, setBody] = useState([])
    const [user, setUser] = useState({})
    const [topic, setTopic] = useState('')
    const [description, setDescription] = useState('')
    const status = false
    const [stime, setStime] = useState('')
    const [etime, setEtime] = useState('')
    const [date, setDate] = useState(new Date())
    const [error, setError] = useState('')
    const [show, setShow] = useState(false)


    useEffect(() => {
        const loginUser = async () => {
            setUser(await axios.get('/getLoginUser'))
        }
        loginUser()

        const getMeets = async () => {
            const tempBody = []
            const { data } = await axios.get('/meet/getmeets')
            data?.forEach((meet) => {
                if (meet.by === user?.data?.userName) {
                    const oneMeet = {
                        id: meet._id,
                        by: meet.by,
                        topic: meet.topic,
                        description: meet.description,
                        stime: meet.stime,
                        etime: meet.etime,
                        status: meet.status
                    }
                    tempBody.push(oneMeet)
                }
            })
            setBody(tempBody)
        }
        getMeets()
    }, [show])


    return (
        <div className="Meeting">
            <h2>Meetings</h2>
            <br></br>
            <br></br>
            <div className="card">
                <h2>All Meetings</h2>
                <br></br>
                <div className="card">
                    <button className="button-primary" onClick={(e) => {
                        e.preventDefault()
                        setShow(!show)
                        setError('')
                    }}>
                        {show ? 'Hide' : 'Show'}
                    </button>
                </div>
                {show && <div className="card">
                    <div className="card__body">
                        <Table
                            headData={head}
                            renderHead={(item, index) => renderHead(item, index)}
                            bodyData={body}
                            renderBody={(item, index) => renderAllBody(item, index)}
                        />
                    </div>
                </div>}
            </div>
            <div className="card">
                <h2>Available Time Slots</h2>
                <br></br>
                <div className="card">
                    <div className="card__body">
                        <Table
                            headData={availableTime.head}
                            renderHead={(item, index) => renderHead(item, index)}
                            bodyData={availableTime.body}
                            renderBody={(item, index) => renderAvailableBody(item, index)}
                        />
                    </div>
                </div>
            </div>
            <div className='card'>
                <h2>Schedule A Meeting</h2>
                <br></br>
                <br></br>
                <div className='card'>
                    <div className="row">
                        <div className="col-6">
                            <label><b>Topic: </b></label>
                            <input onChange={
                                (e) => {
                                    setTopic(e.target.value)
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
                            <div className="inputs">
                                <h3>Select a Date!</h3>
                                <br></br>
                                <Calendar
                                    value={date}
                                    onChange={setDate}
                                />
                                <p>Current selected date is <b>{moment(date).format('MMMM Do YYYY')}</b></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card">
                            <h3>Select a Time!</h3>
                            <br></br>
                            <form>
                                <label htmlFor="stime">Starting Time:</label>
                                <input type="time" onChange={
                                    (e) => {
                                        setStime(e.target.value)
                                        setError("")
                                    }
                                } id="stime" name="stime" />

                                <label htmlFor="etime">Ending Time:</label>
                                <input type="time" onChange={
                                    (e) => {
                                        setEtime(e.target.value)
                                        setError("")
                                    }
                                } id="etime" name="etime" />
                            </form>
                        </div>
                    </div>
                </div>
                <button className='button-primary' onClick={(e) => {
                    e.preventDefault()
                    if (topic === "" || description === "") {
                        if (topic === "") {
                            setError("Topic Can't be empty!")
                        } else if (description === "") {
                            setError("Description Can't be empty!")
                        } else {
                            setError("Something went Wrong!")
                        }
                    } else {
                        try {
                            const sdatetime = new Date(date)
                            const edatetime = new Date(date)
                            sdatetime.setHours(parseInt(stime.slice(0, 2)), parseInt(stime.slice(3, 5)))
                            edatetime.setHours(parseInt(etime.slice(0, 2)), parseInt(etime.slice(3, 5)))
                            try {
                                pushMeet(user.data.userName, topic, description, sdatetime.toISOString(), edatetime.toISOString(), status)
                                setError("Meeting Added!")
                            } catch {
                                setError("Something went Wrong!")
                            }
                        } catch {
                            setError("Please Enter Date and Time Correctly!")
                        }
                    }
                }}>
                    Add
                </button>
                {(() => {
                    if (error === "") {
                        return (
                            <></>
                        )
                    }
                    else if (error === "Meeting Added!") {
                        return (
                            <div className='isa_success'>
                                <i className="fa-solid fa-thumbs-up"></i>
                                {error}
                            </div>
                        )
                    } else if (error === "Something went Wrong!") {
                        return (
                            <div className="isa_error">
                                <i className="fa-solid fa-bomb"></i>
                                {error}
                            </div>
                        )
                    } else {
                        return (
                            <div className="isa_warning">
                                <i className="fa-solid fa-explosion"></i>
                                {error}
                            </div>
                        )
                    }
                })()}
            </div>
        </div>
    )
}
export default Meetings