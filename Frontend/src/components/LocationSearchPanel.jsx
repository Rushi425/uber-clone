import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {
  
  const handleSuggestions = (suggestions) =>{
    if(activeField === 'pickup'){
      setPickup(suggestions);
    }
    else if(activeField === 'destination'){
      setDestination(suggestions);
    }
    //setVehiclePanel(true);
    // setPanelOpen(false);
  }

  return (
    <div>
      {/* Dispaly the suggestions as a list */}
      {
        suggestions.map((elem, idx) =>{
          <div key={idx} onClick={() => handleSuggestions(elem)} className='flex gap-4 border-2 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
            <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
            <h4 className='font-medium'>{elem}</h4>
          </div>
        })
      }
    </div>
  
  );
};

export default LocationSearchPanel;
