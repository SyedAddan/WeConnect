import React, { useState } from 'react'
import StatusCard from '../components/status-card/StatusCard'
import axios from 'axios'

const Hierarchy = () => {
    const [ temp, setTemp ] = useState("")

    axios.get('/api/').then( async (res) => {
        await setTemp(res.data.temp)
    })

    return (
        <div>
            <h2 className="page-header">Hierarchy</h2>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        <div className="col-6">
                        <StatusCard
                            icon={ "bx bx-leaf" }
                            count={ temp }
                            title={ "Temperature" }
                        />
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default Hierarchy