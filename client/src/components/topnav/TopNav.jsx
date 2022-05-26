import React, { useEffect } from 'react'

import './topnav.css'

import { Link } from 'react-router-dom'

import Dropdown from '../dropdown/Dropdown'

import ThemeMenu from '../thememenu/ThemeMenu'

import user_menu from '../../assets/JsonData/user_menus.json'

import axios from 'axios'

var curr_user = {
    display_name: 'Name',
    image: "https://i.imgur.com/2buUV33.png"
}

const userFixer = async () => {
    const userFind = await axios.get('/getLoginUser')
    const name = userFind.data.userName
    var icon

    if (userFind.data.userPri === 1){
        icon = 'https://i.imgur.com/3F2RyZI.png'
    }
    else if (userFind.data.userPri === 2){
        icon = 'https://i.imgur.com/ck9NFEZ.png'
    }
    else if (userFind.data.userPri === 3){
        icon = 'https://i.imgur.com/1z2Umfw.png'
    }
    else if (userFind.data.userPri === 4){
        icon = 'https://i.imgur.com/IS9QyvN.png'
    }
    else if (userFind.data.userPri === 5){
        icon = 'https://i.imgur.com/qnX5Ybq.png'
    }
    else {
        icon = 'https://i.imgur.com/2buUV33.png'
    }

    curr_user = {
        display_name: name,
        image: icon
    }
}

const renderUserToggle = (user) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={user.image} alt="" />
        </div>
        <div className="topnav__right-user__name">
            {user.display_name}
        </div>
    </div>
)

const onClickLogout = async () => {
    const userFind = await axios.get('/getLoginUser')
    await axios.put(
        '/toggleLogin', {
            id: userFind.data._id,
            current: userFind.data.current
        }
    )

    window.location.reload()
}

const renderUserMenu = (item, index) => (
    (item.content !== "Logout") ?
        <Link to='/' key={index}>
            <div className="notification-item">
                <i className={item.icon}></i>
                <span>{item.content}</span>
            </div>
        </Link>
        :
        <Link to='/' key={index} onClick={onClickLogout}>
            <div className="notification-item">
                <i className={item.icon}></i>
                <span>{item.content}</span>
            </div>
        </Link>
)

const Topnav = () => {
    useEffect(() => {
        userFixer()
    }, [])

    return (
        <div className='topnav'>
            <div className="topnav__search"></div>
            <div className="topnav__right">
                <div className="topnav__right-item">
                    <Dropdown
                        customToggle={() => renderUserToggle(curr_user)}
                        contentData={user_menu}
                        renderItems={(item, index) => renderUserMenu(item, index)}
                    />
                </div>
                <div className="topnav__right-item">
                    <ThemeMenu />
                </div>
            </div>
        </div>
    )
}

export default Topnav
