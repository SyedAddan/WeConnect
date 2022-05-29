import React, { useEffect, useState } from 'react';
import axios from 'axios'

const pushSugg = async (by, topic, description, date) => {
    await axios.post(
        "/sandc/addSuggestion", {
        by: by,
        topic: topic,
        description: description,
        date: date
    })
}

const Suggest = () => {
    const [user, setUser] = useState({})
    const [topic, setTopic] = useState('')
    const [description, setDescription] = useState('')
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
            <h2 className="page-header">Suggestions</h2>
            <div className='card'>
                <div>
                    <h2>Add Suggestion</h2>
                </div>
                <div className='card-body'>
                    <div className="card">
                        <div className="row">
                            <div className="col-12">
                                <label><b>The Topic to Suggest About: </b></label>
                                <input onChange={
                                    (e) => {
                                        setTopic(e.target.value)
                                        setError("")
                                    }
                                } type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="row">
                            <div className="col-12">
                                <label><b>The Description of your Suggestion: </b></label>
                                <input onChange={
                                    (e) => {
                                        setDescription(e.target.value)
                                        setError("")
                                    }
                                } type="text" />
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <button className="button-primary" onClick={(e) => {
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
                            pushSugg(user.data.userName, topic, description, date.toISOString())
                            setError("Suggested!")
                        } catch {
                            setError("Something went Wrong!")
                        }
                    }
                }}>
                    Suggest
                </button>
                {(() => {
                    if (error === "") {
                        return (
                            <></>
                        )
                    }
                    else if (error === "Suggested!") {
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

export default Suggest