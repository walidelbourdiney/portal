import React from "react";
import more from "../assets/customer/More.svg";
import envelope from "../../src/assets/customer/envelope.svg";
import phone from "../../src/assets/customer/phone.svg";
import location from "../../src/assets/customer/location.svg";
import map from "../../src/assets/customer/map.svg";
const Customer = (props) => {
  return (
    <div className="relative flex justify-between p-5 bg-white rounded-lg shadow-md w-full">
      <div className="customerContainer  flex flex-col gap-4 ">
        <div className="flex items-center justify-between ">
          <div className="state flex justify-center items-center gap-4">
            <h2 className="text-2xl font-bold">{props.name}</h2>
            <div
              className={`text-center rounded-2xl px-5 py-0 ${
                props.active
                  ? "text-success border-success border"
                  : "text-destructive border-destructive"
              }`}
            >
              {props.active ? "active" : "inactive"}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
          <div className="infoContainer flex flex-col md:flex-row gap-4 align-center ">
            <div className="info flex items-center gap-4 justify-start">
              <img src={phone} className="w-5 h-5" alt="Phone icon" />
              <p className="text-secondary">Phone:</p>
              <p className="text-black">{props.phone}</p>
            </div>
            <div className="info flex items-center gap-4 justify-start">
              <img src={envelope} className="w-5 h-5" alt="Email icon" />
              <p className="text-secondary">Email:</p>
              <p className="text-black">{props.email}</p>
            </div>
          </div>
          <div className="infoContainer flex flex-col md:flex-row gap-4 align-center ">
            <div className="info flex items-center gap-2 justify-start">
              <img src={map} className="w-5 h-5" alt="Country icon" />
              <p className="text-secondary">Country:</p>
              <p className="text-black">{props.country}</p>
            </div>
            <div className="info flex items-center gap-2 justify-start">
              <img src={location} className="w-5 h-5" alt="Location icon" />
              <p className="text-secondary">City:</p>
              <p className="text-black">{props.city}</p>
            </div>
          </div>
        </div>
      </div>
      <button className=" text-secondary block items-center absolute ltr:right-3 rtl:left-3 top-3">
        <img src={more} alt="More options" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Customer;
