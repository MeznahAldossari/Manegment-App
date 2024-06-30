import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Nav from './Nav'
function Accepted() {
    const [allIdeas, setAllIdea]= useState([])
    let localUser = localStorage.getItem("id")

    useEffect(()=>{
        viewAll_accepted()
    },[])



    const viewAll_accepted = ()=>{
        axios.get('https://667b1a30bd627f0dcc91b421.mockapi.io/Users/Users')
        .then(function (response) {
          
            // console.log(response.data)
           let fullArr = []
           response.data.forEach((e)=>{
            return e.ideas.forEach((e2)=>{
                if(e2.status === "accept"){
                    fullArr.push(e2)
                }
            })
           })

           console.log(fullArr)
           
           setAllIdea(fullArr)

})
    }


  return (
    localUser !== '' && localUser !== undefined && localUser !== null ? (
        
      <>
    <div className='flex h-screen max-sm:h-full  w-auto max-sm:w-full  overflow-x-hidden'>
    <div className='grid grid-cols-5 w-full max-sm:flex max-sm:flex-col max-sm:h-full'>
      <div className='w-full bg-white h-full max-sm:h-[10vh]'>
        <Nav/>
      </div>
    <div className='grow col-span-4 bg-[#f1f3f5] max-sm:h-full max-sm:w-full max-sm:flex max-sm:flex-col'>
    <div className='w-full  flex items-center justify-center flex-col max-sm:w-[100%]  max-sm:mt-6 max-sm:pb-4'>

       <div className='flex  flex-col justify-center w-[80%] max-sm:mt-2 mt-12 font-medium text-[#092e68] pb-6'>
            <h2 className='w-full text-[1.5rem] mb-4'>Accepted Ideas</h2>
            <hr className='border-1 w-full'></hr>
        </div>
            
        
    {allIdeas? (
     <>
       {allIdeas.map((myIdea, index)=>{
         return(

        <div className='bg-white  max-sm:w-[90%] max-sm:justify-center flex justify-between w-[80%] border-[1.5px] h-[15vh] rounded-md mt-2' key={index}>

                 
             <div className="w-full  flex flex-col justify-center ">
               <p className="font-medium text-[1.4rem] ml-4 max-sm:text-[1.1rem] text-[#092e68]">{myIdea.title}</p>
             </div>
             <div className='flex h-full justify-end max-sm:justify-center max-sm:w-[60%]  items-center'>
             <p className="text-[1.1rem]  w-[8vw]  mr-4 text-right" style={{color:myIdea.status === "waiting"? "#FF8F00":myIdea.status === "accept"? "#379777": myIdea.status === "Rejected"? "#C80036": "#686D76"}}>{myIdea.status}</p>

        </div>
        </div>
         
        )

       })}
    </>
    ):
    <>
    </>
    }
    </div>

</div>
</div>
</div>
</>):(
null
)
  )}

export default Accepted
