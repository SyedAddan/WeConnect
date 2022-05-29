import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import './sidebar.css'

import logo from '../../assets/images/logo.jpg'

import sidebar_items from '../../assets/JsonData/sidebar_routes.json'
import axios from 'axios'

const SidebarItem = props => {

    const active = props.active ? 'active' : ''

    return (
        <div className="sidebar__item">
            <div className={`sidebar__item-inner ${active}`}>
                <i className={props.icon}></i>
                <span>
                    {props.title}
                </span>
            </div>
        </div>
    )
}

const Sidebar = (props) => {

    const activeItem = sidebar_items.findIndex(item => item.route === props.location.pathname)
    const [ user, setUser ] = useState({})
    
    useEffect(() => {
        const loginUser = async () => {
            setUser(await axios.get('/getLoginUser'))
        }
        loginUser()
    }, [])

    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                <img  src={logo} alt="company logo" />
            </div>
            {
                sidebar_items.map((item, index) => {
                    if (item.route !== "/sandc"){
                        return(
                            <Link to={item.route} key={index}>
                                <SidebarItem
                                    title={item.display_name}
                                    icon={item.icon}
                                    active={index === activeItem}
                                />
                            </Link>
                        )
                    } else {
                        if (user?.data?.userPri === 1) {
                            return(
                                <Link to={item.route} key={index}>
                                    <SidebarItem
                                        title={item.display_name}
                                        icon={item.icon}
                                        active={index === activeItem}
                                    />
                                </Link>
                            )
                        } else {
                            return(<Link to={'/'} key={index}/>)
                        }
                    }
                })
            }
        </div>
    )
}

export default Sidebar
