import React, { useContext, useEffect } from "react";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import gsap from "gsap";
import axios from "axios";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../contexts/SocketContext";
import { UserDataContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setpickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setpanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState({});

  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("join", {
      userType: "user",
      userId: user._id,
    });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  });

  socket.on("ride-started", (ride) => {
    console.log("ride");
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handlePickupChange = async (e) => {
    setpickup(e.target.value);
    try {
      const reponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: {
            input: e.target.value,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(reponse.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const reponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: {
            input: e.target.value,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(reponse.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
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

  const findTrip = async () => {
    if (pickup && destination) {
      setpanelOpen(false);
      setVehiclePanel(true);
    } else {
      alert("Please enter both pickup and destination locations.");
    }

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: {
          pickup: pickup,
          destination: destination,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
    setFare(response.data);
  };

  const createRide = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute top-6 left-6"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      {/* <img
        className="w-full h-screen object-cover"
        src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        alt=""
      /> */}
      <div className="h-screen w-screen">
        <LiveTracking />
      </div>
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
              onChange={handlePickupChange}
              value={pickup}
              onClick={() => {
                setpanelOpen(true);
                setActiveField("pickup");
              }}
            />
            <input
              className="bg-[#eeeeee] w-full px-12 py-2 rounded-lg text-lg mt-3"
              type="text"
              placeholder="Enter your destination"
              onChange={handleDestinationChange}
              value={destination}
              onClick={() => {
                setpanelOpen(true);
                setActiveField("destination");
              }}
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white px-4 py-2 rounded-sm mt-3 w-full"
          >
            Find trip
          </button>
        </div>
        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPanelOpen={setpanelOpen}
            setVehiclePanel={setVehiclePanel}
            activeField={activeField}
            setDestination={setDestination}
            setPickup={setpickup}
          />
        </div>
        <div
          ref={vehiclePanelRef}
          className="fixed bottom-0 z-10 w-full px-3 py-10 pt-12 translate-y-full bg-white rounded-t-xl"
        >
          <VehiclePanel
            setVehicleType={setVehicleType}
            setVehiclePanel={setVehiclePanel}
            setConfirmRidePanel={setConfirmRidePanel}
            fare={fare}
            vehicleType={vehicleType}
          />
        </div>
        <div
          ref={confirmRideRef}
          className="bg-white fixed bottom-0 z-10 w-full translate-y-full  px-3 py-6 pt-12"
        >
          <ConfirmRide
            createRide={createRide}
            vehicleType={vehicleType}
            fare={fare}
            pickup={pickup}
            destination={destination}
            setConfirmRidePanel={setConfirmRidePanel}
            setVehicleFound={setVehicleFound}
          />
        </div>
        <div
          ref={vehicleFoundRef}
          className="bg-white fixed bottom-0 z-10 w-full translate-y-full  px-3 py-6 pt-12"
        >
          <LookingForDriver
            createRide={createRide}
            vehicleType={vehicleType}
            fare={fare}
            pickup={pickup}
            destination={destination}
            setVehicleFound={setVehicleFound}
          />
        </div>
        <div
          ref={waitingForDriverRef}
          className="fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12"
        >
          <WaitingForDriver
            ride={ride}
            setWaitingForDriver={setWaitingForDriver}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
