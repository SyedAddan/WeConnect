import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Hierarchy from '../pages/Hierarchy'
import Meetings from '../pages/Meetings'
import ToDo from '../pages/ToDo'
import SCPortal from '../pages/SCPortal'

import Login from '../pages/Login'
import RecruitmentForm from '../pages/RecruitmentForm'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/hierarchy' component={Hierarchy}/>
            <Route path='/meetings' component={Meetings}/>
            <Route path='/todo' component={ToDo}/>
            <Route path='/scportal' component={SCPortal}/>

            <Route path='/login' component={Login}/>
            <Route path='/recruitment' component={RecruitmentForm}/>
        </Switch>
    )
}

export default Routes
