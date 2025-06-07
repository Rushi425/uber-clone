import React, { useContext, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/vehiclePanel'
import ConfirmedRide from '../components/ConfirmedRide'
import { LookingForDriver } from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import axios from 'axios'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom'
function Home() {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [activeField, setActiveField] = useState('pickup')
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [fare, setFare] = useState(0)
  const [ vehicleType, setVehicleType ] = useState(null)
  const [ride, setRide] = useState(null)

  const navigate = useNavigate()

  const {socket} = useContext(SocketContext)
  const { user } = useContext(UserDataContext)
  
  useEffect(() => {
  if (user?.userId) {
    socket.emit('join', { userType: 'user', userId: user.userId });
  }
}, [user]);
 
 socket.on('ride-confirmed', (ride) => {
  setWaitingForDriver(true);
  setVehicleFound(false);
  setRide(ride);
 });

 socket.on('ride-started', (ride) => {
  setWaitingForDriver(false);
  setVehicleFound(true);
  setConfirmRidePanel(false);
  navigate('/riding', { state: { ride } });
  });

  const handlePickupChange = async(e) => {
    setPickup(e.target.value)
      try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
        params: { input: e.target.value},
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setPickupSuggestions(response.data.suggestions)
    }
  catch (error) {
      console.error('Error fetching pickup suggestions:', error)
    }
  }
  const handleDestinationChange = async(e) => {
    setDestination(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setDestinationSuggestions(response.data.suggestions)
    }
  catch (error) {
      console.error('Error fetching destination suggestions:', error)
    }
  }
  const submitHandler = (e) => {
      e.preventDefault()
  }
  async function findTrip(){
    if (pickup && destination) {
      setPanelOpen(false)
      setVehiclePanel(true)
    } else {
      alert('Please enter both pickup and destination locations.')
    }
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/get-fare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }
  async function createRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/create`, {
            pickup,
            destination,
            vehicleType
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })


  }

  useGSAP(() => {
    if (panelRef.current && panelCloseRef.current) {
      gsap.to(panelRef.current, {
        height: panelOpen ? '70%' : '0%',
        opacity: panelOpen ? 1 : 0,
        padding: panelOpen ? 24 : 0,
        display: panelOpen ? 'block' : 'none'
      })
      gsap.to(panelCloseRef.current, {
        opacity: panelOpen ? 1 : 0
      })
    }
  }, [panelOpen])

  useGSAP(() => {
    if (vehiclePanelRef.current) {
      gsap.to(vehiclePanelRef.current, {
        y: vehiclePanel ? "0%" : "100%",
      })
    }
  }, [vehiclePanel])

  useGSAP(() => {
    if (confirmRidePanelRef.current) {
      gsap.to(confirmRidePanelRef.current, {
        y: confirmRidePanel ? "0%" : "100%",
      })
    }
  }, [confirmRidePanel])

  useGSAP(() => {
    if (vehicleFoundRef.current) {
      gsap.to(vehicleFoundRef.current, {
        y: vehicleFound ? "0%" : "100%",
      })
    }
  }, [vehicleFound])

  useGSAP(() => {
    if (waitingForDriverRef.current) {
      gsap.to(waitingForDriverRef.current, {
        y: waitingForDriver ? "0%" : "100%", 
      });
    }
  }, [waitingForDriver]);

  return (
    <div className="h-screen relative overflow-hidden">
      <img className="w-16 absolute left-5 top-5" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div className="h-screen w-screen">
        <img className="h-full w-full obj" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjj8P47W62yWuQCyBWQknptGadrlz0pWvOJg&s" alt="map img" />
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-5 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 top-6 right-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a Trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <div className="line absolute h-15 w-1 top-[40%] left-10 bg-gray-900 rounded-full"></div>
            <input
              onClick={() =>{
                setPanelOpen(true)
                setActiveField('pickup')
              }
              }
              value={pickup}
              onChange={
                (e) => handlePickupChange(e)
              }
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Add a Pick-up Location"
            />

            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('destination')
              }}
              value={destination}
              onChange={(e) => handleDestinationChange(e)}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter Your Destination"
            />
          </form>
          <button
            onClick={findTrip}
            className ='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="opacity-0 bg-white h-0">
          <LocationSearchPanel 
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed bottom-0 left-0 w-full h-[50%] bg-white z-50 translate-y-full transition-transform duration-300 ease-in-out"
      >
        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>



     <div
        ref={confirmRidePanelRef}
        className="fixed bottom-0 left-0 w-full h-[50%] bg-white z-50 translate-y-full transition-transform duration-300 ease-in-out"
      >
        <ConfirmedRide
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}        />
      </div>


      <div
        ref={vehicleFoundRef}
        className="fixed bottom-0 left-0 w-full h-[50%] bg-white z-50 translate-y-full transition-transform duration-300 ease-in-out"
      >
        <LookingForDriver
          createRide={createRide}
          setVehicleFound={setVehicleFound}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        />
      </div>



      <div
        ref={waitingForDriverRef}
        className="fixed bottom-0 left-0 w-full h-[50%] bg-white z-50 translate-y-full transition-transform duration-300 ease-in-out"
      >
        <WaitingForDriver
        ride={ride}
        setVehicleFound={setVehicleFound}
        setWaitingForDriver={setWaitingForDriver}
        waitingForDriver={waitingForDriver} />
      </div>


    </div>
  )
}

export default Home
