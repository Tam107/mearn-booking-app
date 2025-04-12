import React, { useEffect, useState } from "react";
import iconMap from '../../data/iconMap'; // import the iconMap
import { RxCross1 } from "react-icons/rx";
import { AiOutlineSearch } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { createServicesApi, editFacilitiesApi, editServicesApi } from "../../../Axios/client/api";
import toast from "react-hot-toast";

const ModelUpdateFacility = ({ setFacilitiesDefault,facilitiesDefault,setShowModel,data }) => {
  const [icon, setIcon] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name,setName] = useState()

  useEffect(()=>{
    setIcon(data?.icon)
    setName(data?.name)
    setDropdownOpen(false)
  },[data])

  const handleIconChange = (iconKey) => {
    setIcon(iconKey);
    setDropdownOpen(false); // Close the dropdown after selecting an icon
  };

  

  const  handleClick = async()=>{


        if(!name){
            return toast.error("Name must not be empty")
            
        }
        if(!icon){
            return toast.error("Icon must not be empty")
            
        }
        // console.log(name,icon,description);

        let dataBody = {
          icon
        }

        if (name!= data.name) dataBody.name=name
        
        const res =await editFacilitiesApi(data._id,dataBody)
        if(res.success){
            toast.success("Edit facility successfully!")
            setShowModel(false)
            setName('')
            setIcon('')
            const tmp = facilitiesDefault.map(i=>{
                if(i._id===res.data._id){
                    return res.data
                }
                return i
            })
            setFacilitiesDefault(tmp)

            
        }
        else{
            toast.error(res.message)
            setShowModel(false)
            setName('')
            setIcon('')
        }
        
        

        
  }

  return (
    <>
      <div className="w-full fixed top-0 left-0 h-screen z-50 bg-[#00000042]">
        <div className="mx-auto p-6 w-[60%] rounded-3xl my-40 bg-white">
          <div className="w-full flex items-center justify-end">
            <RxCross1
              className="cursor-pointer"
              onClick={() => setShowModel(false)}
              size={20}
            />
          </div>
          <div className="w-full text-center">
            <h3 className="font-[500] text-[28px] text-gray-500">Edit new service</h3>
          </div>
          <div className="w-full my-4 flex items-center justify-between">
            <input
              type="text"
              placeholder="Service name"
              value={name}
              onChange={e=>setName(e.target.value)}
              className="w-[49%] px-4 py-2 border border-gray-400 rounded-3xl"
            />
            <div className="w-[50%] relative ">
              <div  onClick={() => setDropdownOpen(!dropdownOpen)} className="flex cursor-pointer px-4 py-2 border border-gray-400 rounded-3xl  w-full items-center justify-between">
              <div
               
                className="w-full  flex items-center gap-2"
              >
                {icon ? React.createElement(iconMap[icon], { size: 20 }) : 'Select Icon'} <p>{icon&&icon}</p>
              </div>
              <div className="">
                    <BiChevronDown className="cursor-pointer" size={20} />
              </div>
              </div>

              {dropdownOpen && (
                <div className="absolute overflow-y-auto h-60 w-full mt-2 top-6 left-0 bg-white border border-gray-400 rounded-3xl z-10">
                    <div className="grid grid-cols-2">
                    {Object.keys(iconMap).map((iconKey) => (
                    <button
                      key={iconKey}
                      onClick={() => handleIconChange(iconKey)}
                      className="w-full px-4 py-2 text-left flex items-center gap-2"
                    >
                      {React.createElement(iconMap[iconKey], { size: 20 })} {iconKey}
                    </button>
                  ))}
                    </div>
                  
                </div>
              )}
            </div>
          </div>
          <div onClick={handleClick} className=" w-full cursor-pointer my-4 bg-gray-400 px-4 py-2 rounded-3xl flex items-center justify-center text-white ">Add Service</div>

        </div>
      </div>
    </>
  );
};

export default ModelUpdateFacility;
