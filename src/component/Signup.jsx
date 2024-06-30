import React, { useState } from 'react'
import Nav from './Nav'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
function Signup() {
    const [newUser, setNewUser] = useState({
        username:'',
        email: '',
        password : ''
    })
    const navigate = useNavigate()

    const [errText, setErrText] = useState({
      username: '',
      email: '',
      password: '',
      full: ''
    })

    const SignUp = ()=>{
       
        let arr = {
          username: '',
          email: '',
          password: '',
          full: ''
        }
        setErrText()
        if(newUser.username !=='' && newUser.email !=='' && newUser.password !==''){
            console.log("NOT EMPTY")
         const checkUser = /^[a-zA-Z]{4,}$/
         const checkpassword = /^\d{5}$/
         const checkemail = /^[a-zA-Z0-9._%+-]+@tuwaiq\.[a-zA-Z]{2,}$/
         console.log(checkUser.test(newUser.username))
         console.log(checkUser.test(newUser.username))
         console.log(checkpassword.test(newUser.password))

         if(!checkUser.test(newUser.username)){
          arr.username = "The username shoud be contain at least 4 character"
         }
         if(!checkemail.test(newUser.email)){
            arr.email = "Enter Correct Email"
         }
         if(!checkpassword.test(newUser.password)){
            arr.password = "The Password should be exactly 5 digits"

         }
         
         


         if(checkUser.test(newUser.username) && checkemail.test(newUser.email) && checkpassword.test(newUser.password)){
            console.log("Testing is doe")
            axios.post("https://667b1a30bd627f0dcc91b421.mockapi.io/Users/Users",{
                "username": newUser.username,
                "email": newUser.email,
                "password": newUser.password,
                "role":"student",
                "ideas":[]
            }).then(()=>{
                console.log("hello")
                navigate('/login')
                
            })
         }


        }else{
                arr.full = "Fill All Fields"
        }

        setErrText(arr)
    }
  return (
    // <div>
    //   <div className='w-full h-screen flex flex-col justify-center items-center '>
    //   <div className='flex flex-col items-center justify-center w-[40%] border rounded-md shadow h-[60vh]'>
    //     <input type="text" placeholder='Username' onChange={(e)=>{setNewUser({...newUser,"username": e.target.value})}} className='border-solid border border-black w-[60%] rounded-md mt-4 pl-1'></input>
    //     <input type="email" placeholder='Email' onChange={(e)=>{setNewUser({...newUser, "email":e.target.value})}} className='border-solid border border-black w-[60%] rounded-md mt-1 pl-1' ></input>
    //     <input type="password" placeholder='Password' onChange={(e)=>{setNewUser({...newUser, "password":e.target.value})}} className='border-solid border border-black w-[60%] rounded-md mt-1 pl-1'></input>
    //     <div className='w-[60%] '>
    //     <button className='border-solid border border-black w-[40%] rounded-md mt-1 pl-1 bg-slate-500 text-white' onClick={SignUp}>Sign Up</button>

    //     </div>

    //  </div>
    //   </div>


      <div>
      <div className='grid grid-cols-2 gap-1 max-sm:flex max-sm:w-full'>
      <div className="bg-[#092e68] w-full max-sm:hidden  flex flex-col justify-center text-white text-2xl font-bold text-center p-5 rounded-lg shadow-lg">
    <div className='w-full text-start text-[3rem] pl-14 '>Welcome to</div>
    <div className='w-full text-start text-[2rem] mt-6 pl-14'> Projects Management Dashboard</div>
</div>
      <div className='w-full h-screen flex flex-col justify-center items-center '>
      <div className='flex flex-col items-center justify-center w-[80%] border rounded-md shadow h-[60vh] max-sm:w-[90%]'>
        <h1 className='text-[#325a99] font-medium text-[1.8rem] pb-6'>Sign Up</h1>
      
        <input type="text" placeholder='Username' onChange={(e)=>{
          setNewUser({...newUser,"username": e.target.value})
          setErrText({
            username: '',
            email: '',
            password: '',
            full: ''
          })}} className='border-solid border shadow w-[60%] h-[6vh] rounded-md mt-4 pl-1 max-sm:w-[80%]'></input>
        <p  className='text-[#C80036] text-[0.8rem] max-sm:w-[80%]'>{errText.username}</p>

        <input type="email" placeholder='Email' onChange={(e)=>{
          setNewUser({...newUser, "email":e.target.value})
          setErrText({
            username: '',
            email: '',
            password: '',
            full: ''
          })}} className='border-solid border shadow w-[60%] h-[6vh] rounded-md mt-1 pl-1 max-sm:w-[80%]' ></input>
        <p  className='text-[#C80036] text-[0.8rem]'>{errText.email}</p>
        <input type="password" placeholder='Password' onChange={(e)=>{
          setNewUser({...newUser, "password":e.target.value})
          setErrText({
            username: '',
            email: '',
            password: '',
            full: ''
          })}} className='border-solid border shadow w-[60%] h-[6vh] rounded-md mt-1 pl-1 max-sm:w-[80%]'></input>
        <p  className='text-[#C80036] text-[0.8rem]'>{errText.password}</p>
       
         <div className='w-[60%] max-sm:w-[80%]'>

            {/* {errText.map((e, index) => (
                        <p key={index} className='text-[#C80036] text-[0.8rem]'>{e}</p>
             ))} */}
              <p  className='text-[#C80036] text-[0.8rem]'>{errText.full}</p>
        <p className='text-[0.8rem] mt-1'>Already have account? <Link to="/login"><span className='text-[#4b648b] underline text-[0.8rem]'> Login</span></Link></p>
        <button className='py-0 px-10 text-white mt-6 rounded-md shadow bg-[#FFBF78] cursor-pointer' onClick={SignUp}>Sign Up</button>

        </div>

     </div>
      </div>
   
    </div>
    </div>
   
    // </div>
  )
}

export default Signup
