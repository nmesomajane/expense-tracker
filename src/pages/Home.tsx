import React from 'react'
import Pics from "../assets/image4.png"
import { FaHome } from 'react-icons/fa'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Home: React.FC = () => {
    const [name ,setName]= useState("")
    const[input, setInput]= useState("")
    const navigate =useNavigate()

    
      const handleSubmit = () => {
  if (input.trim()) {
    setName(input);
    console.log("Name:", input);

    // Save to localStorage
    localStorage.setItem("username", input);

    // Navigate to the welcome page
    navigate("/welcome");
  }}
  return (
    <div >
      <div>
        <header className="fixed top-0 w-full h-16 bg-opacity-75 z-50 pl-4 flex items-center z-50 bg-white shadow-md">
            <h2 className='flex items-center gap-2 text-2xl'>  <FaHome className='text-2xl text-yellow ml-2'/>HOME EXPENSES</h2>
        </header>
      </div>
    


     <div className='gap-8 h-screen   items-center  py-4 md:flex justify-center px-4'>
       <div>
            <div className='pt-19'>
                <h1 className="text-5xl text-black md:text-6xl leading-[70px] ">
                    Take Control Of
                    <span className="block text-5xl text-yellow-400 text-center text-left leading-[70px] ">
                    Your Money</span>
                </h1>

                <p className='text-3xl text-neutral-700 mb-5'> Personal budgeting is the secret to financial freedom</p>
                
            </div>
            <div>
                <input type="text" placeholder='What is your Name?' value={input}onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>e.key=== "Enter" && handleSubmit()} className="bg-transparent px-4 py-2 outline-none border rounded-md  text-2xl border-yellow-400  text-black placeholder-gray-300 mb-5" /> <br  />

                <button onClick={handleSubmit} className="bg-red-500 text-white px-4 py-1 rounded cursor-pointer">Create an account</button>
            </div>
        </div>
        
        
        <div>
            <img src={Pics} alt="Money"  className='flex w-[400px] h-auto '/>
        </div>

        
     </div>
    </div>


  )
}

export default Home
