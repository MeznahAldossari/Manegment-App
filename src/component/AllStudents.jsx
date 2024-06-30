import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import close from '../assets/close.png'
import Nav from './Nav'
import searchs from '../assets/search.png'
function AllStudents() {
    const [students, setStudents] = useState([])
    const [studentsRes, setStudentsRes] = useState([])
    const [search, setSearch] = useState('')
    const [notFound, setNotFound] = useState(false)
    let localUser = localStorage.getItem("id")

    useEffect(()=>{
        AllStudentsDetails()
    },[])

    const AllStudentsDetails = ()=>{
        axios.get('https://667b1a30bd627f0dcc91b421.mockapi.io/Users/Users')
        .then(function (response) {
          
            // console.log(response.data)
        

           let studentsInfo = response.data.filter((student)=> student.role === "student" )
            setStudents(studentsInfo)
            console.log(studentsInfo)

})
    }

    const deleteStudent =(id)=>{
        axios.delete(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/Users/${id}`).then((res)=>{
            console.log("deleted")
            setStudents(students.filter((user)=> user.id !== id))
        })
    }
    const onChanging = (e)=>{
        setStudentsRes([]);
        setNotFound(false)
        setSearch(e.target.value)
        
    }

    const clickSearch = () =>{
        setStudentsRes([]);
        setNotFound(false);
        
        if (search !== '') {
          let filtering = students.filter((s) => (
            s.username.toLowerCase().includes(search.toLowerCase())
          ));
      
          setStudentsRes(filtering);
          setNotFound(filtering.length === 0);
        } else {
         
          setStudentsRes(students);
        }
    }



  return (
    
        localUser !== '' && localUser !== undefined && localUser !== null) ? (
          <>
            

    <div className='flex h-screen max-sm:h-full  w-auto max-sm:w-full   overflow-x-hidden'>
  <div className='grid grid-cols-5 w-full max-sm:flex max-sm:flex-col max-sm:h-screen'>
    <div className='w-full bg-white h-full  max-sm:h-[10vh]'>
      <Nav/>
    </div>
    <div className='grow col-span-4 bg-[#f1f3f5] max-sm:h-full h-full max-sm:w-full max-sm:flex max-sm:flex-col'>
    <div className='flex flex-col items-center justify-center w-full '>
          <div className='mt-12 flex h-[10vh] items-center max-sm:justify-center justify-between  w-[78%] max-sm:w-[90%]  max-sm:mt-10 max-sm:pb-4'>
            
          <p className='text-[1.5rem] max-sm:text-[1.2rem]  font-medium text-[#092e68]'>Students Details</p>
          <div className='flex gap-1 max-sm:w-auto  max-sm:justify-end'>
          <input type='text' onChange={onChanging}  placeholder='Find Student' className='py-1 rounded-sm max-sm:w-[70%] h-[5vh] pl-2'/>
          <button className='bg-[#FFBF78] px-1 rounded-md ' onClick={clickSearch}><img src={searchs} className='w-6 h-6'></img></button>

          </div>
          </div>
            <div className='mt-4 grid grid-cols-4 max-sm:grid-cols-2 max-sm:w-[100%] gap-0 place-items-center w-[80%]'>
            {studentsRes.length === 0 && !notFound ? (
            <>
            {students? (
                   <>
                    {students.map((e,index)=>{
                        return(
                        // <Link to={`/studentInfo/${e.id}`} className='w-full' key={index}>
                         <div className='bg-white w-[90%] h-auto py-6 mt-4 max-sm:mt-2 border-[1.8px] justify-center  shadow rounded-md flex items-center flex-col ' key={index}>
                           <div className='w-full flex justify-end'>
                           {/* <button onClick={()=>{deleteStudent(e.id)}}>
                           <img src={close} className='w-6 h-6'></img>
                            </button> */}


                           </div>
                         <img className='w-24' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKsAAACUCAMAAADbGilTAAAAbFBMVEX///8AAADz8/P7+/vw8PDs7Ozi4uJpaWm8vLzp6eksLCz39/fU1NS5ubnY2NgdHR2VlZV9fX2qqqo2NjZNTU1FRUWMjIx3d3exsbHDw8M8PDxgYGBvb2+EhITJycmfn58LCwtVVVUlJSUVFRWc+6IfAAAGOUlEQVR4nO1ca5eqOgwdAXmDCAjKG/3///EepykgikCbllnrsj+eA2VPmyZpsuvPz44dO3bs2PF/hnK0dF23jsrWRL7Dca9BaeRtHMdtbpTBtXK2pvQZ2rWwT81hiOZkG6G2NbExdLM4TMEw9a3pDWDVl0mmT2TBX2GrltFXpk/YZ3Vrmv/gmO/MmqZ5/0dvc8fgGy+ETnlZh55pmtewLvPTq92621K92UM2QWVp/VqrmlUFL4ZgbshUOQ/2z/nztLll1j+UbubAlN5PRfX0Ttfrnq2xEVmtp1oevz55TLonc0sSuxfocff9ee+pd1sw28DVOm23o5YEfbWmj8fSfZdKt9XJW/iGSV1GKjuhoRZ48Re/0hmN5BjmUaprrM+iZK/CeH3AESJSti4U+ZDiPGTurxwC0dqo6UOW08qzAg9Sk9vqNyuwglAAq484gt2VDO9CgnCRFRLAVeYs8VKBoBCgs/r8uQdxrBXT2+6dkJWTGMC0nhlfTyROrApZE2uoVMnrkYyJvRInkDAPEMhzBSQROLG7c50kBql4H6sTEzizJyAqsVh7eSbBCji2Ls2uPg7RSMoKyKTEPL5cabkcyWKoJGYZXIMQk49EG6yFkdWBHYnOtlyMzyisqc86hOQznKOQ9LdGYTQNYmoXzlFaBKOfB8bW6jYXCqNp2JwBloBYko3CaBo2Siz3JHLlDTmmRK48EfaJ2+8od8FFDRyuMm2A1zPK5MrrB2opXIkXzzlHSX9HyVAYTaNE8eIkohQojKZRo+QDJNkWfZSFPIvv/AGJJVuBYTm0A4IjgGTte5OBHyjnArK1IuH1bXK6X1UjHgNqd7yObx4kPHJlL9cDSvCbB1T9C/ZuikOyVxnNo5LXE+hkgBSR0xQqUtKMmQcg7cZGvAn80KDDfJQF55pJaRmAd2SNkCmGh16MiMcVgBO4S+rEQCOOycfSfpysRgztT7QM70IfvxUdXztU0DZcnyhBmtZIVJOAj23WnmdpE094OXMABbbXfV35rIJ+0UmqhMAlAWFdrQ9yX/GJ6wi0Kb+irNG9Iq0ZC1Cp8uq0NLULqLIskS/XS+k0tUt6B1pOH+c9A7PA6ciewrm94lzv9GFjE/mu0quujO+7peqVXJsp33qyj3yarTvQQLJIDpDgDaSPUei/m4LiXwdywrtUUc4YftszOTyKwBvwdXyvLoay0nZjUamWHIZ4RJe2SM/JOS3aS/R4+b9ye5W5bnwQEb9jgehQBszzY4Zok3p/Qa/987SDuZltZkSnkqD3bv473VDfeGrdZBnTJ05JtSFb37DnKQ5w/xIxRDMdU7nERmm6rq/ruu+6ZmLEl/G05/4Gc2u9bqimTcJKGfNQFTdM2pGbla7YNuPh9//F12kGlh9mw4djKdWhDs5w+aNkgbY8Gd6ZaSVGsGowT2297MNKnfcv2aIlGR2CfsNkt+VOXqv6m1OLTz58UPv1j8J1Sb5z7S0hl3Du1ttubs7rzU4ruzWJheve/G4dIza/3hvCSmH6avjdIjKf8dTu8CVWUehSqlynEY/agS0w5PrUVz34ls+naUQkzAxUOqvc7Z7uuokodbFCPUDB/wGFFkJiIUl4d7OISas/Bq2NHwoReRc0JbCuMRzpKgloyPgw9KJK2xJodGbR9xe9V3LHOzpbEdJOHYNewcP0iLTOjawlofeDcAtStNKNmyFCEEC+KqhCPwe1iQgtWI4LEJ9xvKP7Arj/IEBJASqPCC+LgT6GCM0yxC+0YwJcYLmLSDQgyUS7LSn0xhWsGZKihF64ElNAPXJeB3tFKHJauyiDMrwKBySMsT4CUiKM7M184O7UNwR4IZHsrEbcodMnvZqSP3iBQKUQ15qEJB5h795EhaweYGX8upJETI45hEV2L78kmsQVFsnQcpAK4oN3GJR7cHMAO+NNYOBEKLjpj5MZpjjLMwNiaLyKjQzJ7L8D5dYCCLFEK3/gjhSfs4FfCxDdQiPFB8ZfNKAgl+Jt0S0pK0PYXKDQF81VaxHyIxK1UKpt3wD6KQyuHBf4lwEKBVw/SUD/XuH93oB//dQUJaDMg5yTDK5D16+4VlxVv4N+QXDj4cVuZTRPqzzKuJdPd+XIao7+3xBF7dixY8eOHUj4D7hoQ6L6JUncAAAAAElFTkSuQmCC'></img>
                         <h3 className='mt-4'>{e.username}</h3>
                         <p><b>Ideas Total: </b>{e.ideas.length}</p>
                         <div className='w-[90%] flex justify-center gap-2 mt-6'>
                        
                            <button onClick={()=>{deleteStudent(e.id)}} className='bg-[#FFBF78] max-sm:w-[80%] w-[10vw] border text-white rounded-md'>
                                Delete
                            </button>

                         </div>
                     </div>
                        // </Link>
                        
                     )

                    })}
               </>
              
                ):(<></>)
                
            }
            </>
            ) : studentsRes.length > 0 ? (
               <>
                     {studentsRes.map((e,index)=>{
                        return(
                        // <Link to={`/studentInfo/${e.id}`} className='w-full' key={index}>
                         <div className='bg-white w-[90%] h-auto py-6 mt-4 border-[1.8px] justify-center  shadow rounded-md flex items-center flex-col ' key={index}>
                           <div className='w-full flex justify-end'>
                           {/* <button onClick={()=>{deleteStudent(e.id)}}>
                           <img src={close} className='w-6 h-6'></img>
                            </button> */}


                           </div>
                         <img className='w-24' src='data:image/png;base64,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'></img>
                         <h3 className='mt-4 text-[#092e68]'>{e.username}</h3>
                         <p><b className='text-[#092e68]'>Ideas Total: </b>{e.ideas.length}</p>
                         <div className='w-[90%] flex justify-center gap-2 mt-6'>
                            <Link to={`/studentInfo/${e.id}`} className=' w-auto'>
                                <button className='bg-[#FFBF78] w-[6vw] border text-white rounded-md'>
                                    View
                                </button>
                            </Link>
                           
                            <button onClick={()=>{deleteStudent(e.id)}} className='bg-[#FFBF78] w-[10vw] border text-white rounded-md'>
                                Delete
                            </button>

                         </div>
                     </div>
                        // </Link>
                        
                     )

                    })}
               </>
           
            
            ):
            
                <div className='flex justify-center mt-12 w-full items-center  text-[1.2rem]'>
                    <p>There is no results...</p>
                </div>
            
        }
                

            </div>

        </div>

    </div>
   
        </div>
    </div>
          </>
        ) : (
         null
        )
      


//     <div className='flex h-screen max-sm:h-full  w-auto max-sm:w-full   overflow-x-hidden'>
//   <div className='grid grid-cols-5 w-full max-sm:flex max-sm:flex-col max-sm:h-full'>
//     <div className='w-full bg-white h-full max-sm:h-full'>
//       <Nav/>
//     </div>
//     <div className='grow col-span-4 bg-[#f1f3f5] max-sm:h-full max-sm:w-full max-sm:flex max-sm:flex-col'>
//     <div className='flex flex-col items-center justify-center w-full '>
//           <div className='mt-12 flex h-[10vh] items-center max-sm:justify-center justify-between  w-[78%] max-sm:w-[90%]  max-sm:mt-10 max-sm:pb-4'>
            
//           <p className='text-[1.5rem] max-sm:text-[1.2rem]  font-medium text-[#092e68]'>Students Details</p>
//           <div className='flex gap-1 max-sm:w-auto  max-sm:justify-end'>
//           <input type='text' onChange={onChanging}  placeholder='Find Student' className='py-1 rounded-sm max-sm:w-[70%] h-[5vh] pl-2'/>
//           <button className='bg-[#FFBF78] px-1 rounded-md ' onClick={clickSearch}><img src={searchs} className='w-6 h-6'></img></button>

//           </div>
//           </div>
//             <div className='mt-4 grid grid-cols-4 max-sm:grid-cols-2 max-sm:w-[100%] gap-0 place-items-center w-[80%]'>
//             {studentsRes.length === 0 && !notFound ? (
//             <>
//             {students? (
//                    <>
//                     {students.map((e,index)=>{
//                         return(
//                         // <Link to={`/studentInfo/${e.id}`} className='w-full' key={index}>
//                          <div className='bg-white w-[90%] h-auto py-6 mt-4 max-sm:mt-2 border-[1.8px] justify-center  shadow rounded-md flex items-center flex-col ' key={index}>
//                            <div className='w-full flex justify-end'>
//                            {/* <button onClick={()=>{deleteStudent(e.id)}}>
//                            <img src={close} className='w-6 h-6'></img>
//                             </button> */}


//                            </div>
//                          <img className='w-24' src='data:image/png;base64,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'></img>
//                          <h3 className='mt-4'>{e.username}</h3>
//                          <p><b>Ideas Total: </b>{e.ideas.length}</p>
//                          <div className='w-[90%] flex justify-center gap-2 mt-6'>
                        
//                             <button onClick={()=>{deleteStudent(e.id)}} className='bg-[#FFBF78] max-sm:w-[80%] w-[10vw] border text-white rounded-md'>
//                                 Delete
//                             </button>

//                          </div>
//                      </div>
//                         // </Link>
                        
//                      )

//                     })}
//                </>
              
//                 ):(<></>)
                
//             }
//             </>
//             ) : studentsRes.length > 0 ? (
//                <>
//                      {studentsRes.map((e,index)=>{
//                         return(
//                         // <Link to={`/studentInfo/${e.id}`} className='w-full' key={index}>
//                          <div className='bg-white w-[90%] h-auto py-6 mt-4 border-[1.8px] justify-center  shadow rounded-md flex items-center flex-col ' key={index}>
//                            <div className='w-full flex justify-end'>
//                            {/* <button onClick={()=>{deleteStudent(e.id)}}>
//                            <img src={close} className='w-6 h-6'></img>
//                             </button> */}


//                            </div>
//                          <img className='w-24' src='data:image/png;base64,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'></img>
//                          <h3 className='mt-4 text-[#092e68]'>{e.username}</h3>
//                          <p><b className='text-[#092e68]'>Ideas Total: </b>{e.ideas.length}</p>
//                          <div className='w-[90%] flex justify-center gap-2 mt-6'>
//                             <Link to={`/studentInfo/${e.id}`} className=' w-auto'>
//                                 <button className='bg-[#FFBF78] w-[6vw] border text-white rounded-md'>
//                                     View
//                                 </button>
//                             </Link>
                           
//                             <button onClick={()=>{deleteStudent(e.id)}} className='bg-[#FFBF78] w-[10vw] border text-white rounded-md'>
//                                 Delete
//                             </button>

//                          </div>
//                      </div>
//                         // </Link>
                        
//                      )

//                     })}
//                </>
           
            
//             ):
            
//                 <div className='flex justify-center mt-12 w-full items-center  text-[1.2rem]'>
//                     <p>There is no results...</p>
//                 </div>
            
//         }
                

//             </div>

//         </div>

//     </div>
   
//         </div>
//     </div>
  

}
export default AllStudents
