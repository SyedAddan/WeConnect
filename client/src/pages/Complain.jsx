import React, { useEffect, useState } from 'react';
import axios from 'axios'

const pushComp = async (by, towards, area, description, improvement, date) => {
    await axios.post(
        "/sandc/addComplaint", {
        by: by,
        towards: towards,
        area: area,
        description: description,
        improvement: improvement,
        date: date
    })
}

const Compalin = () => {
    const [user, setUser] = useState({})
    const [towards, setTowards] = useState('')
    const [area, setArea] = useState('')
    const [description, setDescription] = useState('')
    const [improvement, setImprovement] = useState('')
    const [date] = useState(new Date())
    const [error, setError] = useState('')

    useEffect(() => {
        const loginUser = async () => {
            setUser(await axios.get('/getLoginUser'))
        }
        loginUser()
    }, [user])

    return (
        <div>
            <h2 className='page-header'>Complains</h2>
            <div className='card'>
                <div>
                    <h2>Add Complaint</h2>
                </div>
                <div className='card'>
                    <div className="row">
                        <div className="col-6">
                            <label><b>Complain Towards: </b></label>
                            <input onChange={
                                (e) => {
                                    setTowards(e.target.value)
                                    setError("")
                                }
                            } type="text" />
                        </div>
                        <div className="col-6">
                            <label><b>Area of Complaint: </b></label>
                            <input onChange={
                                (e) => {
                                    setArea(e.target.value)
                                    setError("")
                                }
                            } type="text" />
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="row">
                        <div className="col-12">
                            <label><b>The Description of your Complaint: </b></label>
                            <input onChange={
                                (e) => {
                                    setDescription(e.target.value)
                                    setError("")
                                }
                            } type="text" />
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="row">
                        <div className="col-12">
                            <label><b>How can we improve: </b></label>
                            <input onChange={
                                (e) => {
                                    setImprovement(e.target.value)
                                    setError("")
                                }
                            } type="text" />
                        </div>
                    </div>
                </div>
                <button className="button-primary" onClick={(e) => {
                    e.preventDefault()
                    if (towards === "" || area === "" || description === "" || improvement === "") {
                        if (towards === "") {
                            setError("The Towards Field Can't be empty!")
                        } else if (area === "") {
                            setError("Area Can't be empty!")
                        } else if (description === "") {
                            setError("Description Can't be empty!")
                        } else if (improvement === "") {
                            setError("The Improvement Remarks Can't be empty!")
                        } else {
                            setError("Something went Wrong!")
                        }
                    } else {
                        try {
                            pushComp(user.data.userName, towards, area, description, improvement, date.toISOString())
                            setError("Complaint Filed!")
                        } catch {
                            setError("Something went Wrong!")
                        }
                    }
                }}>
                    Complain
                </button>
                {(() => {
                    if (error === "") {
                        return (
                            <></>
                        )
                    }
                    else if (error === "Complaint Filed!") {
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

export default Compalin