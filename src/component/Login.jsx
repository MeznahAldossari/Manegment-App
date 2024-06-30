import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
function Login() {
    const [user, setUser] = useState({
        username:'',
        password:''
    })

    const navigate = useNavigate()


    const [errText,setErrText] = useState([])


    const changeUserName =(e)=>{

        setUser({...user,"username": e.target.value})
        setErrText([])

    }
    const changePassword =(e)=>{
        setUser({...user, "password": e.target.value})
        setErrText([])
    }

    // useEffect(()=>{
    //     LoginUser()
    // }, [])

    const LoginUser = ()=>{

        let arr = []
        setErrText([])
        // console.log(user.username);
        if(user.username !=='' && user.password !==''){
            
            axios.get('https://667b1a30bd627f0dcc91b421.mockapi.io/Users/Users')
            .then(function (response) {
            // handle success
            // const users = response.data;
            const findUser = response.data.find((userInfo) => 
                userInfo.username === user.username && userInfo.password === user.password
            );

            console.log(findUser);
            if(findUser){
                localStorage.setItem("id", findUser.id)
                navigate("/dashboard")
            }else {

                setErrText(previous => [...previous,"The Data Not Found, Make Sure to Enter Correct Values"])
                // arr.push("The Data Not Found, Make Sure to Enter Correct Values")
            }


            })
            .catch(function (error) {
            // handle error
            console.log(error);
            })
            .finally(function () {
            // always executed
            });

        }else{
            setErrText(previous => [...previous,"Please Fill All Fields"])
        }

    }
  return (
    <div>
      <div className='grid grid-cols-2 gap-1 max-sm:flex max-sm:w-full'>
      <div className="max-sm:hidden  bg-[#092e68] w-full flex flex-col justify-center text-white text-2xl font-bold text-center p-5 rounded-lg shadow-lg">
    <div className='w-full text-start text-[3rem] pl-14 '>Welcome to</div>
    <div className='w-full text-start text-[2rem] mt-6 pl-14'> Project Management Dashboard</div>
</div>
      <div className='w-full h-screen flex flex-col justify-center items-center '>
      <div className='flex flex-col items-center justify-center w-[80%] border rounded-md shadow h-[60vh] max-sm:w-[90%]'>
        <h1 className='text-[#325a99] font-medium text-[1.8rem] pb-6'>Login</h1>
        <input type="text" placeholder='Username' onChange={changeUserName} className='max-sm:w-[80%] border-solid border shadow w-[60%] h-[6vh] rounded-md mt-4 pl-1'></input>
        <input type="password" placeholder='Password' onChange={changePassword} className='max-sm:w-[80%] border-solid border shadow w-[60%] h-[6vh] rounded-md mt-1 pl-1'></input>
        <div className='w-[60%] max-sm:w-[80%] '>

            {errText.map((e, index) => (
                        <p key={index} className='text-[#C80036] text-[0.8rem]'>{e}</p>
                    ))}
        <p className='text-[0.8rem] mt-1'>Don't have an Account? <Link to="/"><span className='text-[#4b648b] underline text-[0.8rem]'> Sign Up</span></Link></p>
        <button className='py-0 px-10 text-white mt-6 rounded-md shadow bg-[#FFBF78] cursor-pointer' onClick={LoginUser}>Login</button>

        </div>

     </div>
      </div>
   
    </div>
    </div>
  )
}

export default Login
