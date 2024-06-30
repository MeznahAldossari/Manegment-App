import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Nav from './Nav'

function AddIdea() {
    const [data, setData] = useState({
        title:'',
        purpose:'',
        description:'',
        tools:''
    })

    let localUser = localStorage.getItem("id")

    const [errText, setErrText] = useState('')

const [bool, setBool] = useState(false)
    

    const [arr, setArr] = useState([])
    const changetitle =(e)=>{
     setData({...data, "title": e.target.value})
     setErrText('')
     setBool(false)
    } 

    const changepurpose =(e)=>{
        setData({...data, "purpose": e.target.value})
        setErrText('')
        setBool(false)

    } 
    const changedescription =(e)=>{
        setData({...data, "description": e.target.value})
        setErrText('')
        setBool(false)

    } 
    const changetools =(e)=>{
        setData({...data, "tools": e.target.value})
        setErrText('')
        setBool(false)

    } 

  
    const AddNewIdea = () =>{
        setErrText('')
        
        if(data.title !=='' && data.purpose !=='' && data.description !=='' && data.tools !== ''){
            let getUser = localStorage.getItem("id")
            
            axios.get(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/Users/${getUser}`)
            .then(function (response) {
                // console.log(response.data.ideas)
                let ideas = []
                
                ideas = response.data.ideas
                // setArr(data)
                ideas.push({
                    ideaId:String(ideas.length + 1),
                    userId:getUser,
                    title: data.title,
                    purpose: data.purpose,
                    description: data.description,
                    tools: data.tools,
                    status: "Not Sent",
                    reason:""
                    // send:"pending"
                })

            // console.log("HELLO AFTER ADD TO THE idea OBJ VALYES" + ideas)

            axios.put(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/Users/${getUser}`,{
                ideas
                
            }).then((response)=>{
                setErrText("The Idea Created Successfuly")
                setBool(true)
              
                // console.log("Hello"+ideas)
            })
                // console.log("Hello"+ideaArr)
            })
            .catch(function (error) {
            // handle error
            console.log(error);
            })
            .finally(function () {
            // always executed
            });
        }else{
            setErrText('Please Fill All Fields')
            setBool(false)
        }

    }

    
  return (
    localUser !== '' && localUser !== undefined && localUser !== null ? (
        
        <>
        <div className='flex h-screen max-sm:h-full  w-auto max-sm:w-full  overflow-x-hidden'>
    <div className='grid grid-cols-5 w-full max-sm:flex max-sm:flex-col max-sm:h-full'>
    <div className='w-full bg-white h-full max-sm:h-[10vh]'>
      <Nav/>
    </div>
    <div className='w-full max-sm:h-screen h-screen flex justify-center items-center grow col-span-4 bg-[#f1f3f5] max-sm:w-full max-sm:flex max-sm:flex-col'>
     
        <div className='flex bg-white flex-col rounded-lg justify-center items-center border-1 shadow w-[60%] max-sm:w-[90%]  max-sm:mt-6 max-sm:pb-4'>
         <h1 className='font-medium  text-[2rem] pt-4 text-[#092e68]'>Add Idea</h1>
         <input type='text' placeholder='Idea Name' onChange={changetitle} className='w-[80%] px-2 rounded-md mt-6 border-[1.5px] border-gray-300 shadow'></input>
         <textarea  placeholder="Purpose" onChange={changepurpose} rows="2" cols="50" className='w-[80%] px-2 rounded-md mt-2 border-[1.5px] border-gray-300  shadow'></textarea>
         <textarea  placeholder="Description" onChange={changedescription} rows="4" cols="50" className='w-[80%] px-2 rounded-md mt-2 border-[1.5px] border-gray-300 shadow'></textarea>
         <textarea  placeholder="Techniques and Tools" onChange={changetools} rows="2" cols="50" className='w-[80%] px-2 rounded-md mt-2 border-[1.5px] border-gray-300 shadow'></textarea>
        <p className='mt-2 max-sm:text-[0.9rem]' style={{color:bool? "#40A578": "#C80036"}} >{errText}</p>
         <div className='w-[80%] flex py-4'>
         <button className='py-1 px-4 mt-4 text-white rounded-md shadow  bg-[#FFBF78]' onClick={AddNewIdea}>Add Idea</button>
         </div>
            
       
         </div>
        </div>
        </div>
    </div>
  






        </>
    ) : (
        null
    )
);
};



















    // <div className='flex h-screen max-sm:h-full  w-auto max-sm:w-full  overflow-x-hidden'>
    // <div className='grid grid-cols-5 w-full max-sm:flex max-sm:flex-col max-sm:h-full'>
    // <div className='w-full bg-white h-full max-sm:h-full'>
    //   <Nav/>
    // </div>
    // <div className='w-full max-sm:h-full h-screen flex justify-center items-center grow col-span-4 bg-[#f1f3f5] max-sm:w-full max-sm:flex max-sm:flex-col'>
     
    //     <div className='flex bg-white flex-col rounded-lg justify-center items-center border-1 shadow w-[60%] max-sm:w-[90%]  max-sm:mt-6 max-sm:pb-4'>
    //      <h1 className='font-medium  text-[2rem] pt-4 text-[#092e68]'>Add Idea</h1>
    //      <input type='text' placeholder='Idea Name' onChange={changetitle} className='w-[80%] px-2 rounded-md mt-6 border-[1.5px] border-gray-300 shadow'></input>
    //      <textarea  placeholder="Purpose" onChange={changepurpose} rows="2" cols="50" className='w-[80%] px-2 rounded-md mt-2 border-[1.5px] border-gray-300  shadow'></textarea>
    //      <textarea  placeholder="Description" onChange={changedescription} rows="4" cols="50" className='w-[80%] px-2 rounded-md mt-2 border-[1.5px] border-gray-300 shadow'></textarea>
    //      <textarea  placeholder="Techniques and Tools" onChange={changetools} rows="2" cols="50" className='w-[80%] px-2 rounded-md mt-2 border-[1.5px] border-gray-300 shadow'></textarea>
    //     <p className='mt-2 max-sm:text-[0.9rem]' style={{color:bool? "#40A578": "#C80036"}} >{errText}</p>
    //      <div className='w-[80%] flex py-4'>
    //      <button className='py-1 px-4 mt-4 text-white rounded-md shadow  bg-[#FFBF78]' onClick={AddNewIdea}>Add Idea</button>
    //      </div>
            
       
    //      </div>
    //     </div>
    //     </div>
    // </div>
  
  


export default AddIdea
