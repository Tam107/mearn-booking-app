import React, { useState } from "react";

import Item from "./Item";

const Services = ({ handleServiceChange, servicesDefault, services ,setServicesDefault}) => {
  return (
    <>
      {servicesDefault.map((service, index) => (
       <Item servicesDefault={servicesDefault} setServicesDefault={setServicesDefault} services={services} service={service}   handleServiceChange={handleServiceChange}/>
      ))}
    </>
  );
};

export default Services;
