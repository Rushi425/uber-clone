import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopup from '../components/RidePopup'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopup from '../components/ConfirmRidePopup'
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import {CaptainDataContext} from '../context/CaptainContext'

const CaptainHome = () => {
  const [ridePopupPanel, setridePopupPanel] = useState(false)
  const ridePopupPanelRef = useRef(null)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const confirmRidePopupPanelRef = useRef(null)
  const [ride, setRide ] = useState(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() =>{
    socket.emit('join', { userType: 'captain', userId: captain?._id })
   
    const updateLocation = () =>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
          console.log(
            captain?._id,
            position.coords.latitude,
            position.coords.longitude
          )
          console.log('Updating location for captain:', captain?._id)
          socket.emit('update-location-captain', {
            captainId: captain?._id,
            location:{
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()

    return () => {
      // clearInterval(locationInterval) 
    }
  })

  socket.on('new-ride', (ride) => {
    console.log('New ride received:', ride)
    setRide(ride)
    setridePopupPanel(true)
  })

  async function confirmRide(){
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/confirm`,{
      rideId: ride._id,
      captainId: captain?._id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  setConfirmRidePopupPanel(true)
  setridePopupPanel(false)  
}

  useGSAP(function () {
    if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(ridePopupPanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
}, [ ridePopupPanel ])

  useGSAP(function () {
    if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(confirmRidePopupPanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
}
, [ confirmRidePopupPanel ])

  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/captain-login' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>

      <CaptainDetails />

      <div ref={ridePopupPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full p-3 py-10 px-3 bg-white">
        <RidePopup 
          ride= {ride}
          setridePopupPanel={setridePopupPanel} 
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide= {confirmRide}
          />
      </div>
      <div ref={confirmRidePopupPanelRef} className="fixed w-full h-screen z-10 bottom-0 translate-y-full p-3 py-10 px-3 bg-white">
        <ConfirmRidePopup
        ride={ride} 
        setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        setridePopupPanel={setridePopupPanel}/>
      </div>
    </div>
  )
}


export default CaptainHome