import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import UsersComponent from '../components/Users'

function UsersPage() {
  return (
    <div>
        <Sidebar/>
        <Navbar/>
        <UsersComponent/>
    </div>
  )
}

export default UsersPage