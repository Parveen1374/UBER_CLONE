import React from "react";

const LocationSearchPanel = (props) => {
  const { setPanelOpen, setVehiclePanel } = props;
  const addresses = [
    "24B Theradi Street, Near Temple, Tiruvannamalai, Tamil Nadu",
    "24B Theradi Street, Near Temple, Tiruvannamalai, Tamil Nadu",
    "24B Theradi Street, Near Temple, Tiruvannamalai, Tamil Nadu",
    "24B Theradi Street, Near Temple, Tiruvannamalai, Tamil Nadu",
    "24B Theradi Street, Near Temple, Tiruvannamalai, Tamil Nadu",
  ];

  return (
    <>
      {addresses.map((each, index) => (
        <div
          onClick={() => {
            setVehiclePanel(true);
            setPanelOpen(false);
          }}
          key={index}
          className="flex justify-start items-center gap-4 border-2 border-gray-50 p-3 rounded-xl active:border-black my-2"
        >
          <h2 className="bg-[#eee] rounded-full p-2 w-12 h-8 flex justify-center items-center">
            <i className="text-xl ri-map-pin-fill" />
          </h2>
          <h4 className="font-medium">{each}</h4>
        </div>
      ))}
    </>
  );
};

export default LocationSearchPanel;
