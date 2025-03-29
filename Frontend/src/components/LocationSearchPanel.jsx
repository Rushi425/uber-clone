import React from 'react'

const LocationSearchPanel = ({ setVehiclePanel, setPanelOpen }) => {
  // Sample array for location
  const locations = [
    '24 B near cappors1 catfe, SHeriyans coding, Bhopal1',
    '25 B near cappors2 catfe, SHeriyans coding, Bhopal2',
    '26 B near cappors3 catfe, SHeriyans coding, Bhopal3',
    '27 B near cappors4 catfe, SHeriyans coding, Bhopal4',
  ]

  return (
    <div>
      {locations.map((elem, index) => (
        <div
          key={index}
          onClick={() => {
            setVehiclePanel(true);
            setPanelOpen(false);
          }}
          className="flex gap-4 my-4 border-white active:border-black border-2 p-2 rounded-xl items-center justify-start"
        >
          <h2 className="bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{elem}</h4>
        </div>

        
      ))}
       {/* <div className='flex gap-4 my-4 border-white active:border-black border-2 p-2 rounded-xl  items-center justify-start'>
        <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full' ><i className="ri-map-pin-fill"></i></h2>
        <h4 className='font-medium' >24 B near cappors catfe, SHeriyans coding, Bhopal</h4>
      </div>
      <div className='flex gap-4 my-4 border-white active:border-black border-2 p-2 rounded-xl  items-center justify-start'>
        <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full' ><i className="ri-map-pin-fill"></i></h2>
        <h4 className='font-medium' >24 B near cappors catfe, SHeriyans coding, Bhopal</h4>
      </div><div className='flex gap-4 border-white active:border-black border-2 p-2 rounded-xl  my-4 items-center justify-start'>
        <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full' ><i className="ri-map-pin-fill"></i></h2>
        <h4 className='font-medium' >24 B near cappors catfe, SHeriyans coding, Bhopal</h4>
      </div><div className='flex  gap-4 border-white active:border-black border-2 p-2 rounded-xl  my-4 items-center justify-start'>
        <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full' ><i className="ri-map-pin-fill"></i></h2>
        <h4 className='font-medium' >24 B near cappors catfe, SHeriyans coding, Bhopal</h4>
      </div> */}
    </div>
  );
};

export default LocationSearchPanel;
