import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { MdOutlineNavigateNext } from "react-icons/md";
function Admin() {
    const [students, setStudents] = useState(0)
    const [viewData, setView] = useState([])

    useEffect(()=>{
        getStudents()
        viewIdeas()
    },[])

    const getStudents = ()=>{

        axios.get('https://667b1a30bd627f0dcc91b421.mockapi.io/Users/Users')
        .then(function (response) {
        // handle success
        // const users = response.data;
        
        let checkRole = response.data.filter((roles)=> roles.role === "student")
        if(checkRole){
            setStudents(checkRole.length)
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

    const viewIdeas = ()=>{
          
      axios.get('https://667b1a30bd627f0dcc91b421.mockapi.io/Users/Users')
      .then(function (response) {
          console.log(response.data)
          setView(response.data)
        
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
    <div className='w-full max-sm:h-screen'>
    <div className='w-full max-sm:h-full flex flex-col items-center justify-center '>
        <div className='grid grid-cols-2 w-[90%] py-6 max-sm:mt-32  place-items-center gap-4'>
        
                
                <div className='flex flex-col  justify-center  h-[25vh]  w-full'>
                <h2 className='text-[2.5rem] text-[#092e68] max-sm:text-[1.7rem] text-start font-medium'>Admin Dashboard</h2>
                </div>

                <Link to="/students" className='w-full'>
                <div className='flex flex-col bg-white justify-center items-center h-[25vh] shadow-md rounded-lg border-1 w-full'>
                
                <h2 className='text-[1.5rem] max-sm:text-[1.2rem] text-[#f0aa5a] font-medium'><span className='text-[4rem] max-sm:text-[2.5rem] text-[#092e68]  font-medium mr-2'>{students}</span> Students</h2>
                </div>
                </Link>
        </div>
        <div className='flex flex-col w-[90%] mt-6 font-medium text-[#092e68]'>
            <h2 className='w-full text-[1.5rem] max-sm:text-[1.2rem] mb-4'>Students Ideas</h2>
            <hr className='border-1 w-full'></hr>
          </div>
        <div className='w-[90%] flex flex-col  items-center mt-9 max-sm:mt-4'>
          
               {viewData? (
                <>
                {viewData.map((myIdea, index) => (
                  <div key={index} className="w-full">
                    {myIdea.ideas.map((e2, index2) => {
                      if (e2.status === "waiting" || e2.status === "accept" ) {
                        return (
                          <Link to={`/ideaDetails/${e2.ideaId}/${e2.userId}`} className="w-full" key={index2}>
                            <div className='bg-white flex justify-between w-full border-[1.5px] h-[15vh] rounded-md mt-1 cursor-pointer'>

                            
                            <div className="w-full  flex flex-col justify-center ">
                              <p className="font-medium text-[1.4rem] max-sm:text-[1rem] ml-4 text-[#092e68]">{e2.title}</p>
                              <p className="text-[0.8rem] ml-4">Sent by: {myIdea.username}</p>
                            </div>
                            <div className='flex h-full justify-center items-center'>
                            <p className="text-[1.1rem] px-4 max-sm:text-[1rem]" style={{color:e2.status === "waiting"? "#FF8F00":e2.status === "accept"? "#379777": e2.status === "Rejected"? "#C80036": "#686D76"}}>{e2.status}</p>
                           
                             <MdOutlineNavigateNext style={{fontSize:"24px"}} className='mr-4'/>



                            </div>

                            </div>
                          </Link>
                        );
                      }
                      return null; 
                    })}
                  </div>
                ))}
       
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

export default Admin
