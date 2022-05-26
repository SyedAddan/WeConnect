import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Hierarchy from '../pages/Hierarchy'
import Meetings from '../pages/Meetings'
import ToDo from '../pages/ToDo'
import Suggest from '../pages/Suggest'
import Complain from '../pages/Complain'
import SandC from '../pages/SandC'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/hierarchy' component={Hierarchy}/>
            <Route path='/meetings' component={Meetings}/>
            <Route path='/todo' component={ToDo}/>
            <Route path='/suggest' component={Suggest}/>
            <Route path='/complain' component={Complain}/>
            <Route path='/sandc' component={SandC}/>
        </Switch>
    )
}

export default Routes
