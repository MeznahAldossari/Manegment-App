import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';

function Ideadetails() {
    const [ideaInfo, setIdeaInfo] = useState({})
    const [reason, setReason] = useState(false)
    const [action, setAction] = useState('')
    const [checkAction, setCheckAction] = useState(false)
    const [updatedBool, setupdatedool] = useState(false)
    const [updatedErr, setupdatedErr] = useState('')
    const [acceptErr, setAcceptErr] = useState(false)
    const [rejErr, setRejErr] = useState(false)
    const navigate = useNavigate()
    let localUser = localStorage.getItem("id")


    const [errText, setErrText] = useState('')

    const [errDeatilsAdmin, setErrDeatilsAdmin] = useState('')
    const [adminbool, setAdminbool] = useState(false)



    const [bool, setBool] = useState(false)
    

    const { ideaId, userId } = useParams();
    console.log("idea id:"+ideaId)
    let localValue = localStorage.getItem("id")

    
  
    useEffect(()=>{
        UserDetails()
    },[])



    const UserDetails = () =>{
        axios.get(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/Users/${userId}`)

        .then(function (response) {
        // handle success
        console.log(response.data.ideas);
        let idea = response.data.ideas.find((i)=> i.ideaId === ideaId)
        
        if(idea){
            console.log("the result is"+idea);
            setIdeaInfo({
                "ideaId":idea.ideaId,
                "userId":idea.userId,
                "username":idea.username,
                "title":idea.title,
                "purpose": idea.purpose,
                "description":idea.description,
                "tools":idea.tools,
                "status": idea.status,
                "reason": idea.reason
            })

        }
     })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
        .finally(function () {
        // always executed
        });

    }

    const updateIdea = ()=>{
        setupdatedool(false)

        setErrDeatilsAdmin("")
            setAdminbool(false)
        axios.get(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/Users/${userId}`)

        .then(function (response) {
        // handle success
        console.log(response.data.ideas);
        let idea = response.data.ideas.find((i)=> i.ideaId === ideaId)

        
       if(ideaInfo.title !=='' && ideaInfo.purpose !=='' && ideaInfo.description !=='' && ideaInfo.purpose !=='' && idea.status === "waiting"){
    
        console.log('HIIIIIIIII'); 
        const dataAfterUpdated = response.data.ideas.map(idea => {
            if (idea.ideaId === ideaId) {
                console.log('Updating idea:', idea); 
                return {
                    "ideaId": ideaId,
                    "userId": ideaInfo.userId,
                    "title": ideaInfo.title,
                    "purpose": ideaInfo.purpose,
                    "description": ideaInfo.description,
                    "tools": ideaInfo.tools,
                    "status": ideaInfo.status
                };
            }
            return idea; 
        });
        
        return axios.put(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/Users/${userId}`, {
            ideas: dataAfterUpdated
        }).then((res=>{
            setErrDeatilsAdmin("The Idea Updated Sucessfuly")
            setAdminbool(true)
       

            
        }))
        ;}else{

            setErrDeatilsAdmin("Please Make sure to fill all fields and the Status is Waiting")
            setAdminbool(false)
        }
      

        console.log("the result is"+idea);
      
     })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
        .finally(function () {
        // always executed
        });
    }
  const acceptIdea = ()=>{
    setErrDeatilsAdmin("")
    setAdminbool(false)

    axios.get(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/Users/${userId}`)

    .then(function (response) {
    // handle success
    console.log(response.data.ideas);
    let idea = response.data.ideas.find((i)=> i.ideaId === ideaId)

    
   if(ideaInfo.title !=='' && ideaInfo.purpose !=='' && ideaInfo.description !=='' && ideaInfo.purpose !=='' && idea.status === "waiting"){


    const dataAfterUpdated = response.data.ideas.map(idea => {
        if (idea.ideaId === ideaId) {
            console.log('Updating idea:', idea); 
            return {
                "ideaId": ideaId,
                "userId": userId,
                "title": ideaInfo.title,
                "purpose": ideaInfo.purpose,
                "description": ideaInfo.description,
                "tools": ideaInfo.tools,
                "status": "accept"
            };
          
        }
        return idea; 
    });
    // if(dataAfterUpdated.status === "accept"){
    //     setCheckAction(true)
        
    // }
    setIdeaInfo({"status": dataAfterUpdated.status})

    
    
    return axios.put(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/Users/${userId}`, {
        ideas: dataAfterUpdated
    }).then(()=>{
        // setErrDeatilsAdmin("The idea status changed to Accepted")
        setAdminbool(true)
        navigate(0)
        

    });
}else{
    // setAcceptErr("Make Sure to Fill All Data, And the Status Waiting Before Accepted")
    setErrDeatilsAdmin("Make Sure to Fill All Fields, And the Status is Waiting Before Accepted")
    setAdminbool(false)

    }
  

    console.log("the result is"+idea);
  
 })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
    .finally(function () {
    // always executed
    });

  }


  const rejectIdea = ()=>{
    setRejErr(false)

    setErrDeatilsAdmin("")
    setAdminbool(false)

    axios.get(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/Users/${userId}`)

    .then(function (response) {
    // handle success
    console.log(response.data.ideas);
    let idea = response.data.ideas.find((i)=> i.ideaId === ideaId)

    console.log("hhhhh"+ ideaInfo.reason)
   if(ideaInfo.title !=='' && ideaInfo.purpose !=='' && ideaInfo.description !=='' && ideaInfo.reason !== '' && ideaInfo.reason !== undefined  && idea.status === "waiting"){
    console.log("meznahXXXX"+ ideaInfo.reason)
   const  dataAfterUpdated = response.data.ideas.map(idea => {
        if (idea.ideaId === ideaId) {
            console.log('Updating idea:', idea); 
            return {
                ...idea,
                "status": "Rejected",
                "reason":ideaInfo.reason
            };
          
        }
        return idea; 
    });

    
  
    return axios.put(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/Users/${userId}`, {
        ideas: dataAfterUpdated
    }).then((res)=>{
        // setRejErr("The Status Changed to Rejected")
        // navigate(0)
        // setErrDeatilsAdmin("The Status Changed to the Rejected Status")
        setAdminbool(true)
        navigate(0)

    });}else{
        // setRejErr("Make Sure to Fill All Data, And the Status Waiting Before Rejected")

        setErrDeatilsAdmin("Make Sure to Fill All Fields, And the Status is Waiting Before Rejected")
        setAdminbool(false)
    }
  

    console.log("the result is"+idea);
  
 })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
    .finally(function () {
    // always executed
    });

  }

  const adimAction = ()=>{
    setReason(false)
    setCheckAction(false)
    console.log(action)
    if(action=== "Update"){
        console.log("hello+++++++++++++++")
        updateIdea()
    }else if(action=== "accept"){

        acceptIdea()
    }else if(action=== "Reject"){
        console.log("hi this is reject action" + ideaInfo.reason)
       
        
        rejectIdea()

    }
  }

  const ChangeStatus =()=>{
    setBool(false) 
    setErrText('')
    
    axios.get(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/Users/${userId}`)

    .then(function (response) {
    // handle success
    console.log(response.data.ideas);
    let idea = response.data.ideas.find((i)=> i.ideaId === ideaId)

    
   if(ideaInfo.title !=='' && ideaInfo.purpose !=='' && ideaInfo.description !=='' && ideaInfo.purpose !=='' && idea.status === "Not Sent"){


    const dataAfterUpdated = response.data.ideas.map(idea => {
        if (idea.ideaId === ideaId) {
            console.log('Updating idea:', idea); 
            return {
                "ideaId": ideaId,
                "userId": userId,
                "title": ideaInfo.title,
                "purpose": ideaInfo.purpose,
                "description": ideaInfo.description,
                "tools": ideaInfo.tools,
                "status": "waiting"
            };
          
        }
        return idea; 
    });

    setIdeaInfo({"status": dataAfterUpdated.status})
    // 

    
    return axios.put(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/Users/${userId}`, {
        ideas: dataAfterUpdated
    }).then((res)=>{
        setErrText("The Idea has been Sent Successfuly")
        setBool(true) 
        navigate(0)

    });}else{
        setErrText("Please Fill All Fields") 
    setBool(false)   }
    
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
    localUser !== '' && localUser !== undefined && localUser !== null ? (
        
        <>
    <div className='flex h-screen max-sm:h-full bg-[#f1f3f5] w-auto max-sm:w-full  overflow-x-hidden'>
    <div className='grid grid-cols-5  w-full max-sm:flex max-sm:flex-col max-sm:h-full'>
    <div className='w-full bg-white h-full max-sm:h-[10vh]'>
      <Nav/>
    </div>
    <div className='w-full max-sm:h-screen max-sm:mt-24 h-full flex justify-center items-center grow col-span-4 bg-[#f1f3f5] max-sm:w-full max-sm:flex max-sm:flex-col'>
     
        <div className='flex bg-white flex-col rounded-lg justify-center items-center border-1 shadow w-[60%] max-sm:w-[90%]  max-sm:mt-6 max-sm:pb-4'>
         <h1 className='font-medium max-sm:text-[1.3rem] text-[2rem] pt-4 text-[#092e68]'>Idea Details</h1>
         <input type='text'  disabled={localValue !== "1" && ideaInfo.status !=="Not Sent" } value={ideaInfo.title} placeholder='Idea Name' onChange={(e) => {
            setIdeaInfo({
                ...ideaInfo,
                "title": e.target.value
            });
            setErrDeatilsAdmin("");
            setAdminbool(false);
            }} 
className='w-[80%] px-2 rounded-md mt-6 border-[1.5px] border-gray-300 shadow'></input>
         <textarea disabled={localValue !== "1" && ideaInfo.status !=="Not Sent" } value={ideaInfo.purpose}  placeholder="Purpose" onChange={(e) => {
        setIdeaInfo({
            ...ideaInfo,
            "purpose": e.target.value
        });
        setErrDeatilsAdmin("");
        setAdminbool(false);
        }}

rows="2" cols="50" className='w-[80%] px-2 rounded-md mt-2 border-[1.5px] border-gray-300  shadow'></textarea>
         <textarea disabled={localValue !== "1" && ideaInfo.status !=="Not Sent" } value={ideaInfo.description} placeholder="Description" onChange={(e) => {
            setIdeaInfo({
                ...ideaInfo,
                "description": e.target.value
            });
            setErrDeatilsAdmin("");
            setAdminbool(false);
            }}
 rows="4" cols="50" className='w-[80%] px-2 rounded-md mt-2 border-[1.5px] border-gray-300 shadow'></textarea>
         <textarea disabled={localValue !== "1" && ideaInfo.status !=="Not Sent" } value={ideaInfo.tools}  placeholder="Techniques and Tools" onChange={(e) => {
            setIdeaInfo({
                ...ideaInfo,
                "tools": e.target.value
            });
            setErrDeatilsAdmin("");
            setAdminbool(false);
            }}
rows="2" cols="50" className='w-[80%] px-2 rounded-md mt-2 border-[1.5px] border-gray-300 shadow'></textarea>
         <div className=' w-[80%] flex justify-start mt-4 '>
         <p className='pb-4'><b className='mr-2 '>Status: </b>{ideaInfo.status}</p>

         </div>
         {localValue === "1"? (
         <div className='w-[80%] flex flex-col gap-2 pb-4'>
            <select onChange={(e)=>{setAction(e.target.value)}} className='px-2 rounded-md mt-1 border-[1.5px] border-gray-300 shadow w-full'>
                <option value="">
                  Select Action
                </option>
                <option value="Update">
                Update
                </option>
                <option value="accept">
                accept
                </option>

                <option value="Reject">
                Reject
                </option>
            </select>

            {action === "Reject" && (
                <textarea 
                placeholder="Reasons" 
                onChange={(e) => {
                    setIdeaInfo({
                        ...ideaInfo,
                        "reason": e.target.value
                    });
                    setErrDeatilsAdmin("");
                    setAdminbool(false);
                    }}
                rows="2" 
                cols="50" 
                className='w-full px-2 rounded-md mt-2 border-[1.5px] border-gray-300 shadow'
                required
                ></textarea>
      )}



            {/* {updatedErr ? (
        <div>
          {}
        </div>
      ) : acceptErr ? (
        <div>
         
        </div>
      ) : rejErr ? (
        <div>
        
        </div>
      ) : (
        null
      )} */}
           <p style={{color:adminbool?"green": "red"}} className='mt-2 text-[0.8rem]'>
            {errDeatilsAdmin}
           </p>
       
           <button className='py-1 px-4 mt-4 text-white font-medium mb-2 rounded-md shadow  bg-[#FFBF78]' onClick={adimAction}>Apply</button>


         {/* <button className='py-1 px-4 mt-4 text-white rounded-md shadow  bg-black' onClick={updateIdea}>Update Idea</button>
         <button className='py-1 px-4 mt-4 text-white rounded-md shadow  bg-black' onClick={acceptIdea}>Accept</button>
         <button className='py-1 px-4 mt-4 text-white rounded-md shadow  bg-black' onClick={rejectIdea}>Reject</button>

          */}
      
         </div>
         ): (
            <>
              {(ideaInfo.reason !== '' && ideaInfo.reason !== undefined && ideaInfo.status === "Rejected") && (
                <div className=' w-[80%] flex justify-start'>
                <p className='pb-4'><b className='mr-2 '>Reason: </b>{ideaInfo.reason}</p>
       
                </div>
              )}
              {ideaInfo.status === "Not Sent" && (
                <div className='w-[80%] flex gap-2 py-4'>
                  {/* <p style={{color:bool? "#40A578": "#C80036"}}>
                    {errText}
                  </p> */}
                  <button className='py-1 px-4 mt-4 text-white rounded-md shadow bg-[#FFBF78]' onClick={ChangeStatus}>
                    Send Idea
                  </button>
                </div>
              )}
            </>
          )}
        
        
         

         </div>
        </div>
        </div>
    </div>

    </>):(null)
  )
}

export default Ideadetails
