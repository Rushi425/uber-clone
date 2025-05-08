import React from 'react'
import { Link } from 'react-router-dom'

const CaptainRiding = () => {
    return (
        <div className='h-screen'>
          <div className='fixed p-6 top-0 flex items-center justify-between w-screen bg-white z-20'>
            <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
            <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
              <i className="text-lg font-medium ri-logout-box-r-line"></i>
            </Link>
          </div>
    
          <div className='h-4/5 pt-24'>
            <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="Ride Animation" />
          </div>
    
          <div className='h-1/5 flex justify-between items-center p-6 bg-yellow-300 relative'>
            <button className='absolute top-0 left-1/2 -translate-x-1/2' onClick={() => {
              console.log("Swipe panel trigger")
            }}>
              <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
            </button>
            <h1 className='text-xl font-semibold'>4 Km away</h1>
            <button className='bg-green-600 text-white font-semibold px-4 py-2 rounded-lg'>
              Complete Ride
            </button>
          </div>
        </div>
      )
    }

export default CaptainRiding