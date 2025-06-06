import React from 'react'

export default function VehiclePanel( props ) {
  return (
    <div>
      <h5 className='p-2 text-center absolute top-0 w-[90%]' onClick={() => {
        props.setVehiclePanel(false);
      }}><i className="text-3xl text-gray-400 ri-arrow-down-line"></i></h5>
      <h2 className="text-2xl font-semibold mb-5">Choose a Vehicle</h2>
      <div onClick={() => {
        props.setConfirmRidePanel(true);
        props.setVehicleType('car');
      }} className="flex w-full border-2 mb-2 rounded-xl p-3 items-center justify-between">
        <img className="h-5" src={' ' || null} alt="" />
        <div className="w-1/2">
          <h4 className="text-sm font-medium">
            UberGo <span><i className="ri-user-3-fill"></i>4</span>
          </h4>
          <h5 className="text-gray-500 text-xs font-medium">2 mins away</h5>
          <p>Affordable, compact rides</p>
        </div>
        <h2 className="text-lg font-semibold">Rs.{props.fare.car}</h2>
      </div>
      <div onClick={() => {
        props.setConfirmRidePanel(true);
        props.setVehicleType('motorcycle');
      }} className="flex w-full border-2 mb-2 rounded-xl p-3 items-center justify-between">
        <img className="h-10" src={' ' || null} alt="" />
        <div className="w-1/2">
          <h4 className="text-sm font-medium">
            Moto <span><i className="ri-user-3-fill"></i>4</span>
          </h4>
          <h5 className="text-gray-500 text-xs font-medium">3 mins away</h5>
          <p>Affordable, motorCycle rides</p>
        </div>
        <h2 className="text-lg font-semibold">
          Rs.{props.fare.motorcycle}
        </h2>
      </div>
      <div onClick={() => {
        props.setConfirmRidePanel(true);
        props.setVehicleType('auto');
      }} className="flex w-full border-2 mb-2 rounded-xl p-3 items-center justify-between">
        <img className="h-10" src={' ' || null} alt="" />
        <div className="w-1/2">
          <h4 className="text-sm font-medium">
            Moto <span><i className="ri-user-3-fill"></i>4</span>
          </h4>
          <h5 className="text-gray-500 text-xs font-medium">3 mins away</h5>
          <p>Affordable, motorCycle rides</p>
        </div>
        <h2 className="text-lg font-semibold">
          Rs.{props.fare.auto}
        </h2>
      </div>
    </div>
  )
}
