import React, { useState } from 'react'
import Calendar from 'react-calendar'
import moment from 'moment'
import { Checkbox } from '@mui/material'
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


const allMeetings = {
    head: [
        "Planned By",
        "Topic",
        "Description",
        "Start Time",
        "End Time",
        "Status"
    ],
    body: [
        {
            by: "Syed Addan",
            topic: "WeConnect Project",
            desc: "Scrum Meeting",
            stime: "May 30th 2022, 8:30 Am",
            etime: "May 30th 2022, 9:30 Am",
            status: false
        }
    ]
}


const renderHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderAllBody = (item, index) => (
    <tr key={index}>
        <td>{item.by}</td>
        <td>{item.topic}</td>
        <td>{item.desc}</td>
        <td>{item.stime}</td>
        <td>{item.etime}</td>
        <Checkbox
            checked={item.status && true}
            onChange={(e) => {
                    e.preventDefault()
                    item.status = !item.status
                }
            }
        />
    </tr>
)

const renderAvailableBody = (item, index) => (
    <tr key={index}>
        <td>{item.starttime}</td>
        <td>{item.endtime}</td>
        <td>{item.count}</td>
    </tr>
)
const Meetings = () => {
    const [dateState, setDateState] = useState(new Date())
    const changeDate = (e) => {
        setDateState(e)
    }
    return (
        <div className="Meeting">
            <h2>Meetings</h2>
            <br></br>
            <br></br>
            <div className="card">
                <h2>All Meetings</h2>
                <br></br>
                <div className="card">
                    <div className="card__body">
                        <Table
                            headData={allMeetings.head}
                            renderHead={(item, index) => renderHead(item, index)}
                            bodyData={allMeetings.body}
                            renderBody={(item, index) => renderAllBody(item, index)}
                        />
                    </div>
                </div>
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
                            <label><b>Task: </b></label>
                            <input onChange={
                                (e) => {
                                    
                                }
                            } type="text" />
                        </div>
                        <div className="col-6">
                            <label><b>Description: </b></label>
                            <input onChange={
                                (e) => {
                                    
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
                                    value={dateState}
                                    onChange={changeDate}
                                />
                                <p>Current selected date is <b>{moment(dateState).format('MMMM Do YYYY')}</b></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card">
                            <h3>Select a Time!</h3>
                            <br></br>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                            }}>
                                <label for="stime">Starting Time:</label>
                                <input type="time" id="stime" name="stime" />

                                <label for="etime">Ending Time:</label>
                                <input type="time" id="etime" name="etime" />
                            </form>
                        </div>
                    </div>
                </div>
                <button className='button-primary' onClick={(e) => {
                    e.preventDefault()
                }}>
                    Add
                </button>
            </div>
        </div>
    )
}
export default Meetings