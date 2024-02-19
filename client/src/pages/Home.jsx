import React, { useState } from 'react'
import { auth } from "../config/firebase.config"
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { Banner, Mainloader } from "../components"
import useApps from '../hooks/apps/useApps'
import { motion, AnimatePresence } from "framer-motion"
import { MdStar } from 'react-icons/md'
import { FaHeart } from 'react-icons/fa6'
import { ChatContainer } from '../containers'


const Home = () => {
  const navigate = useNavigate();
  const { data: apps, isLoading: appsLoading, isError: appsError, refetch: appsRefetch } = useApps();

  const [isHovered, setIsHovered] = useState(null);

  if (appsLoading) {
    return <Mainloader />
  }

  return (
    <div className='w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 py-4 my-6'>
      {/* {left section} */}
      <div className='col-span-12 lg:col-span-8 overflow-y-scroll scrollbar-none'>
        <Banner />

        <div className='w-full grid grid-cols-4 lg:grig-cols-4 2xl:grid-cols-6 gap-2 py-4'>
          {apps && apps?.length > 0 && apps?.map((app,index) => (
            <React.Fragment>
              <div className='duration-200 w-full rounded-md overflow-hidden relative cursor-pointer' onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}>
                <img src={app?.cover} className='w-full h-64 object-cover duration-200' alt="" />

                <AnimatePresence>
                  {isHovered===index && (
                    <Link to={`/detail/${app?._id}`}>
                      <motion.div
                      initial={{opacity:0}}
                      animate={{opacity:1}}
                      exit={{opacity:0}}
                      className='absolute inset-0 bg-[rgba(0,0,0,0.8)] flex flex-col items-center justify-between px-2 py-4'>
                        <div className='w-full flex items-center justify-between'>
                          <div className='flex items-center justify-center gap-2'>
                            <MdStar className='text-heroPrimary text-base' />
                            <p>{app?.totalReviews}</p>
                          </div>

                          <div className='flex items-center justify-center gap-1'>
                            <FaHeart className='text-red-500 text-md 2xl:text-base' />
                          </div>

                          
                        </div>
                        <div className='w-full flex flex-col items-start justify-start gap-2'>
                            <p className='text-sm 2xl:text-base text-[rgba(255,255,255,0.8)]'>{app?.title}</p>
                            <p className='text-xs 2xl:text-base text-heroSecondary'>{app?.company}</p>
                          </div>
                      </motion.div>
                    </Link>
                  )}
                </AnimatePresence>
              </div>
            </React.Fragment>
          ))

          }
        </div>
      </div>
      {/* {right section} */}
      <div className='col-span-4 h-full hidden lg:block'>
        <ChatContainer/>
      </div>
    </div>
  )
}

export default Home
