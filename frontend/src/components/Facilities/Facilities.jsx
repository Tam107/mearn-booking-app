import React, { useState } from "react";

import Item from "./Item";


const Facilities = ({handleFaChange,facilities,facilitiesDefault,setFacilitiesDefault}) => {
  return (
    <>
      {facilitiesDefault.map((data, index) => (
       <Item  handleFaChange={handleFaChange} facilities={facilities} setFacilitiesDefault={setFacilitiesDefault} key={index} data={data} facilitiesDefault={facilitiesDefault}/>
      ))}
    </>
  );
};

export default Facilities;
