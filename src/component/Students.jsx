import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { MdOutlineNavigateNext } from "react-icons/md";

function Students() {
    // const [ideas, setIdeas] = useState()
    const [viewData, setView] = useState([])
    const [acceptedIdea, setAcceptedIdea] = useState(0)
    

    useEffect(()=>{
      viewIdeas()
      allAccepted()
  }, [])

    const viewIdeas = ()=>{
      let getUser = localStorage.getItem("id")
          
      axios.get(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/Users/${getUser}`)
      .then(function (response) {
          console.log(response.data.ideas)
          setView(response.data.ideas)
          
        
          // console.log("Hello"+ideaArr)
      })
      .catch(function (error) {
      // handle error
      console.log(error);
      })
      .finally(function () {
      // always executed
      });
  

  }

  const allAccepted = ()=>{
    
    let count = 0 
    axios.get(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/Users`)
    .then(function (response) {
        console.log(response.data)
        response.data.forEach(idea => {
          idea.ideas.forEach(ideas2 => {
            if (ideas2.status === 'accept') {
              count++
            }
          });
        });
        console.log(count)
        setAcceptedIdea(count)
      
        // console.log("Hello"+ideaArr)
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
    
    <div className='w-full'>
    <div className='w-full flex flex-col items-center justify-center '>
        <div className='grid grid-cols-2 w-[90%]  place-items-center gap-2 mt-4'>
               
                <div className='flex flex-col  justify-center  h-[25vh]  w-full'>
                <h2 className='text-[2.5rem]   text-[#092e68] max-sm:text-[1.5rem] text-start font-medium'>Student Dashboard</h2>
                </div>
       
           <Link to="/accepted" className='w-full'>
                <div className='flex flex-col bg-white justify-center items-center h-[25vh] shadow-md rounded-lg border-1 w-full'>
                
                <h2 className='text-[1.5rem] max-sm:text-[1.2rem]   text-[#f0aa5a] font-medium'><span className='text-[4rem] max-sm:text-[2.5rem] text-[#092e68]  font-medium mr-2'>{acceptedIdea}</span> Accepted</h2>
                </div>
                </Link>
               
        </div>
        {/* <div className='w-[80%] gap-4 flex justify-end items-center h-full mt-10 '>
          
          <select className='px-4 py-[2px]'>
            <option value="">All ideas</option>
            <option value="Accepted Ideas">Accepted Ideas</option>
            <option value="Rejected Ideas">Rejected Ideas</option>
          </select>
            <Link to ="/addIdea">
            <button className='py-1 px-2 text-white rounded-md shadow  bg-black'>Add New Idea</button>

            </Link>
        </div> */}
        <div className='flex w-[90%] mt-10 justify-between items-center mt- font-medium text-[#092e68]'>
          <div className='flex flex-col'>
            <h2 className='w-full text-[1.5rem] mb-2  max-sm:text-[1.2rem]'>My Ideas</h2>
            {/* <hr className='border-1 w-full'></hr> */}
          </div>
          <div className='mr-2'>
          <Link to ="/addIdea">
            <button className='py-1 px-2 text-white rounded-md shadow bg-[#FFBF78]'>Add New Idea</button>

          </Link>

          </div>
           
          </div>
        <div className='w-[90%] flex flex-col items-center mt-9'>
               {viewData? (
                <>
                  {viewData.map((myIdea, index)=>{
                    return(
                      <Link to={`/ideaDetails/${myIdea.ideaId}/${myIdea.userId}`} className='w-full' key={index}>
                       <div className='bg-white flex justify-between w-full border-[1.5px] h-[15vh] rounded-md mt-1 cursor-pointer'>

                            
                        <div className="w-full  flex flex-col justify-center ">
                          <p className="font-medium text-[1.4rem] max-sm:text-[1rem] ml-4">{myIdea.title}</p>
                        </div>
                        <div className='flex h-full justify-end items-center'>
                        <p className="text-[1.1rem]  w-[8vw]  mr-4 text-right max-sm:text-[1rem] max-sm:w-[24vw] max-sm:mr-2" style={{color:myIdea.status === "waiting"? "#FF8F00":myIdea.status === "accept"? "#379777": myIdea.status === "Rejected"? "#C80036": "#686D76"}}>{myIdea.status}</p>

                        <MdOutlineNavigateNext style={{fontSize:"24px"}} className='mr-4'/>



</div>
</div></Link>
                    
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
  )
}

export default Students
