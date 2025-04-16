import React, { useState } from "react";

import Item from "./Item";

const Services = ({ isView,handleServiceChange, servicesDefault, services ,setServicesDefault}) => {
  return (
    <>
      {servicesDefault.map((service, index) => (
       <Item isView={isView} servicesDefault={servicesDefault} setServicesDefault={setServicesDefault} services={services} service={service}   handleServiceChange={handleServiceChange}/>
      ))}
    </>
  );
};

export default Services;
