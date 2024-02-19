import React, { useEffect} from 'react'
import { LoginBG } from "../assets"
import { FcGoogle } from 'react-icons/fc'
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { auth } from '../config/firebase.config';
import useUser from '../hooks/users/useUser';
import {useNavigate} from "react-router-dom"




const  Authentication =()=> {

  const googleProvider = new GoogleAuthProvider();

  const {data: user,isError,isLoading,refetch} = useUser();

  const navigate = useNavigate();

  useEffect(()=>{
    if(!isLoading && user){
       navigate("/",{replace:true})
    }
  },[isLoading,user]
  );

  if(isLoading) {
    return <div>Loading...</div>
  }

  const handleLoginAction = async () => {
    try {
        const userCred = await signInWithRedirect(auth, googleProvider);
        if (userCred) {
            console.log(userCred);
        }
    } catch (error) {
        console.error("Error signing in:", error);
    }
};



  return (
    <div style={{
      background: `url(${LoginBG})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }} className='w-screen h-screen flex items-center justify-center px-4 py-6' >

      <div className='w-full lg:w-96 px-4
      py-6 rounded-md backdrop-blur-md flex items-center justify-center flex-col gap-8 bg-[rgba(255,255,255,0.1)]'>

        <div className='flex flex-col items-center justify-center gap-2'>
          <p className='text-2xl text-white'>Welcome Back !</p>
          <p className='text-lg text-gray-400'>Sign in to access your store</p>
        </div> 
        <div onClick={handleLoginAction} className='w-full lg:w-auto px-4 py-3 flex items-center justify-center border border-gray-200 cursor-pointer rounded-md active:scale-95 transition-all duration-150 ease-in-out gap-3 bg-[rgba(255,255,255,0.2)]'>
          <FcGoogle className='text-2xl' />
            <p className='text-lg font-semibold text-white'>Sign in with Gmail</p>
          
        </div>
      </div>
    </div>
  )
}

export default Authentication
