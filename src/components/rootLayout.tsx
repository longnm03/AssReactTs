import React from 'react'
import { Outlet } from 'react-router-dom'
import '../asset/rootLayout.css'

const UserLayoutPage = () => {
  return (
<div>
    <nav>
      <ul>
        <li><a href='/signin'>Đăng nhập</a></li>
        <li><a href='/signup'>Đăng ký</a></li>
      </ul>
    </nav>
    <Outlet />
    </div>

  )
}

export default UserLayoutPage