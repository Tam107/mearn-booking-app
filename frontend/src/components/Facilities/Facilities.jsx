import React, { useState } from "react";

import Item from "./Item";


const Facilities = ({isView,handleFaChange,facilities,facilitiesDefault,setFacilitiesDefault}) => {
  return (
    <>
      {facilitiesDefault.map((data, index) => (
       <Item isView={isView} handleFaChange={handleFaChange} facilities={facilities} setFacilitiesDefault={setFacilitiesDefault} key={index} data={data} facilitiesDefault={facilitiesDefault}/>
      ))}
    </>
  );
};

export default Facilities;
