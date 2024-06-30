import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Admin from './Admin'
import Students from './Students'
import Nav from './Nav'

function Dashboard() {
   const [checkRole, setCheckRole] = useState('')
    useEffect(()=>{
        getRole()
        
    },[])
    const getRole = ()=>{
        let getUser = localStorage.getItem("id")
        axios.get(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/Users/${getUser}`)
            .then(function (response) {
            // handle success
            // const users = response.data;
            setCheckRole(response.data.role)
            // let checkRole = response.data.role.find((roles)=> roles.role === "Admin")
            // console.log(response.data.role)
            })
            .catch(function (error) {
            // handle error
            console.log(error);
            })
            .finally(function () {
            // always executed
            });
    }

  return (
    <div className='flex h-screen w-auto max-sm:w-full  overflow-x-hidden'>
  <div className='grid grid-cols-5 w-full h-screen max-sm:flex max-sm:flex-col'>
    <div className='w-full bg-white h-full max-sm:h-[10vh]'>
      <Nav/>
    </div>
        <div className='grow col-span-4 max-sm:w-full  max-sm:h-auto max-sm:flex max-sm:flex-col  h-full bg-[#f1f3f5] max-sm:rounded-bl-[0px] max-sm:rounded-tl-[0px] rounded-bl-[20px] border rounded-tl-[20px]'>
      {checkRole === "Admin" ? (
        <Admin />
      ) : checkRole === "student" ? (
        <Students />
      ) : null}
    </div>
  </div>
</div>
  )
}

export default Dashboard
