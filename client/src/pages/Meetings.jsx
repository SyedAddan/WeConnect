import React, { useState } from 'react'
import Calendar from 'react-calendar'
import moment from 'moment'
import Table from '../components/table/Table'

const AvailableTime = {
    header: [
        "starttime",
        "endtime",
        "count"
    ],
    body: [
        {
            starttime: "9:00 AM",
            endtime: "10:00 AM",
            count: "12"
        },
        {
            starttime: "10:00 AM",
            endtime: "11:00 AM",
            count: "15"
        },
        {
            starttime: "11:00 AM",
            endtime: "12:00 PM",
            count: "7"
        },
        {
            starttime: "12:00 PM",
            endtime: "1:00 PM",
            count: "9"
        },
        {
            starttime: "1:00 PM",
            endtime: "2:00 PM",
            count: "20"
        }
    ]
}


const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderOrderBody = (item, index) => (
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
            <h2>Schedule a Meeting! </h2>
            <br></br>
            <br></br>
            <div className="row">
                <div className="col-9">
                    <div className="inputs">
                        <h3>Select a Date! </h3>
                        <br></br>
                        <Calendar
                            value={dateState}
                            onChange={changeDate}
                        />
                        <p>Current selected date is <b>{moment(dateState).format('MMMM Do YYYY')}</b></p>
                    </div>
                </div>
                <div className="col-3">
                    <h3>Select a Suitable Time! </h3>
                    <br></br>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                    }}>
                        <label for="stime">Starting Time:</label>
                        <input type="time" id="stime" name="stime" />

                        <label for="etime">Ending Time:</label>
                        <input type="time" id="etime" name="etime" />

                        <input type="submit" onSubmit={(e) => {
                            e.preventDefault()
                        }} />
                    </form>
                </div>
            </div>
            <br></br>
            <br></br>
            <div className="AvailableTimeSlots">
                <h2>Available Time Slots</h2>
                <br></br>
                <div className="card">
                    {/* <div className="card__header">
                    <h3>Available Time Slots</h3>
                </div> */}
                    <div className="card__body">
                        <Table
                            headData={AvailableTime.header}
                            renderHead={(item, index) => renderOrderHead(item, index)}
                            bodyData={AvailableTime.body}
                            renderBody={(item, index) => renderOrderBody(item, index)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Meetings