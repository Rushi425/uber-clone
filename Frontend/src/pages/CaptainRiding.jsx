import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)
  const location = useLocation()
  const rideData = location.state?.ride

  useGSAP(function () {
    if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
}
, [ finishRidePanel ])

    return (
        <div className='h-screen relative flex flex-col justify-end'>
          <div className='fixed p-6 top-0 flex items-center justify-between w-screen bg-white z-20'>
            <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
              <i className="text-lg font-medium ri-logout-box-r-line"></i>
            </Link>
          </div>
         <div className='h-1/5 flex justify-between items-center p-6 bg-yellow-300 relative'
            onClick={() => {
              setFinishRidePanel(true)
            }}>
            
            <button className='absolute top-0 left-1/2 -translate-x-1/2' onClick={() => {
            }}>
              <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
            </button>
            <h1 className='text-xl font-semibold'>4 Km away</h1>
            <button
              
             className='bg-green-600 text-white font-semibold px-4 py-2 rounded-lg'>
              Complete Ride
            </button>
          </div>

          <div ref={finishRidePanelRef} className="fixed w-full h-screen z-[500] bottom-0 translate-y-full p-3 py-10 px-3 bg-white">
          <FinishRide 
          ride={rideData}
          setfinishRidePanel={setFinishRidePanel} />
          </div>

           <div className='h-screen fixed w-screen top-0 z-[500]'>
            <LiveTracking />
          </div>
        </div>
      )
    }

export default CaptainRiding