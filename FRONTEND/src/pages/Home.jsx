import React from "react";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import gsap from "gsap";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickup, setpickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setpanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRideRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(confirmRideRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute top-6 left-6"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <img
        className="w-full h-screen object-cover"
        src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        alt=""
      />
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] bg-white relative rounded-t-xl p-6">
          {panelOpen && (
            <h5
              className="absolute right-6 top-6 text-2xl"
              onClick={() => setpanelOpen(false)}
            >
              <i className="ri-arrow-down-wide-line"></i>
            </h5>
          )}
          <h4 className="font-semibold text-2xl">Find a trip</h4>

          <form className="relative py-3" onSubmit={(e) => handleSubmit(e)}>
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              className="bg-[#eeeeee] w-full px-12 py-2 rounded-lg text-lg"
              type="text"
              placeholder="Add a pick-up location"
              onChange={(e) => setpickup(e.target.value)}
              value={pickup}
              onClick={() => setpanelOpen(true)}
            />
            <input
              className="bg-[#eeeeee] w-full px-12 py-2 rounded-lg text-lg mt-3"
              type="text"
              placeholder="Enter your destination"
              onChange={(e) => setDestination(e.target.value)}
              value={destination}
              onClick={() => setpanelOpen(true)}
            />
          </form>
        </div>
        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPanel
            setPanelOpen={setpanelOpen}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
        <div
          ref={vehiclePanelRef}
          className="fixed bottom-0 z-10 w-full px-3 py-10 pt-12 translate-y-full bg-white rounded-t-xl"
        >
          <VehiclePanel
            setVehiclePanel={setVehiclePanel}
            setConfirmRidePanel={setConfirmRidePanel}
          />
        </div>
        <div
          ref={confirmRideRef}
          className="bg-white fixed bottom-0 z-10 w-full translate-y-full  px-3 py-6 pt-12"
        >
          <ConfirmRide
            setConfirmRidePanel={setConfirmRidePanel}
            setVehicleFound={setVehicleFound}
          />
        </div>
        <div
          ref={vehicleFoundRef}
          className="bg-white fixed bottom-0 z-10 w-full translate-y-full  px-3 py-6 pt-12"
        >
          <LookingForDriver setVehicleFound={setVehicleFound} />
        </div>
        <div
          ref={waitingForDriverRef}
          className="fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12"
        >
          <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
        </div>
      </div>
    </div>
  );
};

export default Home;
