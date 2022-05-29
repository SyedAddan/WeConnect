import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

import Table from '../components/table/Table'

const renderCompHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderCompList = (item, index) => (
    <tr key={index}>
        <td>{item.by}</td>
        <td>{item.towards}</td>
        <td>{item.area}</td>
        <td>{item.description}</td>
        <td>{item.improvement}</td>
        <td>{moment(item.submittedOn).format('MMMM Do YYYY, h:mm:ss a')}</td>
    </tr>
)


const renderSuggHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderSuggList = (item, index) => (
    <tr key={index}>
        <td>{item.by}</td>
        <td>{item.topic}</td>
        <td>{item.description}</td>
        <td>{moment(item.submittedOn).format('MMMM Do YYYY, h:mm:ss a')}</td>
    </tr>
)

const SandC = () => {
    const [compHead] = useState([
        "By",
        "Towards",
        "Area",
        "Descirption",
        "What We Can Do",
        "Filed On"
    ])
    const [suggHead] = useState([
        "By",
        "Topic",
        "Descirption",
        "Suggested On"
    ])
    const [compBody, setCompBody] = useState([])
    const [suggBody, setSuggBody] = useState([])
    const [show, setShow] = useState(false)

    useEffect(() => {
        const dataGetter = async () => {
            const { data } = await axios.get('/sandc/getsandcs')
            setSuggBody(data[0])
            setCompBody(data[1])
        }
        dataGetter()
    }, [show])


    return (
        <div>
            <h2 className="page-header">All Suggestions and Complaints</h2>
            
            <div className='card'>
                <button className='button-primary' onClick={(e) => {
                    e.preventDefault()
                    setShow(!show)
                }}>
                    {show ? "Hide" : "Show"}
                </button>
                <br />
                <br />
                { show && <div>
                    <div className='card'>
                        <h2>All Complaints</h2>
                        <br />
                        <br />
                        <div className='card'>
                            <Table
                                headData={compHead}
                                renderHead={(item, index) => renderCompHead(item, index)}
                                bodyData={compBody}
                                renderBody={(item, index) => renderCompList(item, index)}
                            />
                        </div>
                    </div>
                    <div className='card'>
                        <h2>All Suggestions</h2>
                        <br />
                        <br />
                        <div className='card'>
                            <Table
                                headData={suggHead}
                                renderHead={(item, index) => renderSuggHead(item, index)}
                                bodyData={suggBody}
                                renderBody={(item, index) => renderSuggList(item, index)}
                            />
                        </div>
                    </div>
                </div> }
            </div> 
        </div>
    )
}

export default SandC