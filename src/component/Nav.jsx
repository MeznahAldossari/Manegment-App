import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import user from "../assets/users.png"
import logout from "../assets/logout.png"

import { RiLoginCircleFill } from "react-icons/ri"
import { IoPersonAdd } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";



function Nav() {
  let getLocal = localStorage.getItem("id")
  const [profile, setProfle] = useState({})
  const navigate = useNavigate()

  useEffect(()=>{
    profileinfo()
  },[])

  const profileinfo = ()=>{
    setProfle({})
    let getLocal = localStorage.getItem("id")
    axios.get(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/Users/${getLocal}`).then((element)=>{
      setProfle({"username": element.data.username})
   
    })
  }
  const  removeLocal = ()=>{
    localStorage.removeItem("id")
    navigate("/login")

  }
  return (
    <div className='h-full '>
      <nav className=' flex flex-col max-sm:flex-row max-sm:h-[15vh]  h-full w-full shadow-lg max-sm:bg-[#092e68]'>
        <ul className='flex flex-col w-full place-items-center  max-sm:place-items-start max-sm:justify-between gap-1  h-full max-sm:flex-row max-sm:h-[15vh]'>
        
          <div className='flex bg-[#092e68] h-[40vh] justify-around max-sm:hidden flex-col items-center w-full max-sm:justify-center max-sm:flex-row max-sm:h-[8vh]'>
            <div className='w-full flex justify-start max-sm:hidden'>
            <img src={logout} onClick={removeLocal} className='curser-pointer w-6 ml-2 mt-4'></img>
            </div> 
            <img src={user} className='w-20 mt-6 max-sm:hidden' alt='User Profile' />
            <h3 className='mt-6 text-[1.5rem] pb-4 text-white max-sm:hidden'>{profile.username}</h3>
          </div>
         <div className='md:hidden flex justify-start  w-[100%]'>
         <div className='flex justify-start items-center md:hidden'>
            <img src={logout} onClick={removeLocal} className='curser-pointer w-4 ml-2 mt-4'></img>
          </div> 

         </div>
        

         
         
        
          
          <div className='w-full mt-6 max-sm:mt-0 text-[1rem]  md:border-t md:border-b md:border-[#d4d4d7]'>
          <ul className='md:divide-y md:divide-[#d4d4d7] '>
          {/* <Link to="/login" className='w-full block pl-6'>
            <li className='p-2 flex items-center'>
              <RiLoginCircleFill style={{ fontSize: '24px' }} color='#0C359E' className='mr-2' />
              Login
            </li>
          </Link>
          <Link to="/signup" className='w-full block pl-6'>
            <li className='p-2 flex items-center'>
              <IoPersonAdd style={{ fontSize: '24px' }} color='#0C359E' className='mr-2' />
              Sign Up
            </li>
          </Link> */}
          <Link to="/dashboard"  className='w-full max-sm:flex max-sm:justify-end block pl-6 max-sm:pl-0 max-sm:pr-2 max-sm:py-1'>
            <li className='p-2 max-sm:text-white flex items-center max-sm:justify-center max-sm:items-center '>
              <IoHomeSharp
               style={{ fontSize: '24px' }} color='#0C359E' className='mr-2 max-sm:text-white max-sm:hidden' />
              Home
            </li>
          </Link>

          </ul>
        </div>
          
        </ul>
      </nav>
    </div>
  )
}

export default Nav
