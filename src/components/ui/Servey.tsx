import React from "react";

const Servey = () => {
  return (
    <div className=" max-w-7xl mx-auto rounded-md text-center flex gap-4 justify-around lg:justify-center lg:gap-12 flex-wrap px-3  pt-8 bg-purple-100 opacity-75 pb-8 mt-8">
      <div className="p-4 rounded-md bg-purple-300 shadow-md">
        <h2>4.5 Lac+</h2>
        <p className="font-mono">Clients Served</p>
      </div>
      <div className="p-4 rounded-md bg-purple-300 shadow-md">
        <h2>5.5 Lac+</h2>
        <p className="font-mono">Property Onboarded</p>
      </div>
      <div className="p-4 rounded-md bg-purple-300 shadow-md">
        <h2>700+</h2>
        <p className="font-mono">Brands Served</p>
      </div>
      <div className="p-4 rounded-md bg-purple-300 shadow-md">
        <h2>2000+</h2>
        <p className="font-mono">Daily User Visit</p>
      </div>
    </div>
  );
};

export default Servey;