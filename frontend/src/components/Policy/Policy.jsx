import React, { useState } from "react";

import Item from "./Item";

const Policy = ({typePolicyDefault, handlePolicyChange, policy, setPolicy ,policyChecked}) => {
  return (
    <>
      {policy.map((data, index) => (
       <Item typePolicyDefault={typePolicyDefault} policy={policy} setPolicy={setPolicy} policyChecked={policyChecked} data={data}   handlePolicyChange={handlePolicyChange}/>
      ))}
    </>
  );
};

export default Policy;
