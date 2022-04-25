import React, { useState, useEffect } from 'react'
import Topology from '../components/topology/Topology'
import axios from 'axios'

const Hierarchy = () => {
    const [ users, setUsers ] = useState([])

    useEffect(() => {
        axios.get("/getData").then( (res) => {
            setUsers(res.data)
        })
    }, [])

    return (
        <div>
            <h2 className="page-header">Hierarchy</h2>
            <Topology data = { users } />
        </div>  
    )
}

export default Hierarchy