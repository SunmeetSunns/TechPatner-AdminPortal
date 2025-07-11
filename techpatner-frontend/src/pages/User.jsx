import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import UsersComponent from '../components/Users'
import { useNavigate } from 'react-router-dom';

function UsersPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const password = localStorage.getItem("password");
    if (!password) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
        <Sidebar/>
        <Navbar/>
        <UsersComponent/>
    </div>
  )
}

export default UsersPage