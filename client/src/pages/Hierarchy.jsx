import React, { useState, useEffect } from 'react'
import Topology from '../components/topology/Topology'
import axios from 'axios'

const Hierarchy = () => {
    const [ users, setUsers ] = useState([])

    useEffect(() => {
        axios.get("/getUsers").then( (res) => {
            setUsers(res.data)
        })
    }, [])

    return (
        <div>
            <h2 className="page-header">Hierarchy</h2>
            <div className="card">
                <Topology data = { users } />
            </div>
        </div>  
    )
}

export default Hierarchy