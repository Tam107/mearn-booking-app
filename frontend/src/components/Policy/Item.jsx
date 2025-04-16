import React, { useState } from 'react'
import iconMap from '../../data/iconMap'
import { Tooltip } from 'antd'
import { MdOutlineDeleteOutline, MdOutlineEdit } from 'react-icons/md'
import { deletePolicyApi, deleteServicesApi } from '../../../Axios/client/api'
import toast from 'react-hot-toast'
import ModelUpdateService from '../ModelUpdateService/ModelUpdateService'
import ModelUpdatePolicy from './ModelUpdatePolicy'

const Item = ({ typePolicyDefault,policy, setPolicy, policyChecked,data,handlePolicyChange}) => {
  const [hover, setHover] = useState(false)
  const [showEdit,setShowEdit] = useState(false)

  const handleDelete =async (event) => {
    const res=  await deletePolicyApi(data._id)
    if(res.success){
        toast.success(res.message)        
        const tmp = policy.filter(i=>{
          if(i._id !== data._id) return i
        })
        setPolicy(tmp)
    }
    else{
      toast.error("False")
    }

  }
  

  const handleUpdate = (event) => {
    setShowEdit(true);

  }

 

  return (
    <>
        <div  onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)} className='relative'>
        <label
        className="cursor-pointer  h-20 border border-gray-300 p-2 flex rounded-2xl gap-1 items-center"
       
      >
        <input
            onChange={() => handlePolicyChange(data?._id)}
            type="checkbox"
          className="mr-2"
          checked={policyChecked?.includes(data?._id)}
        />

        <span className="mr-2">
          {iconMap[data?.icon]
            ? React.createElement(iconMap[data?.icon])
            : null}
        </span>

        <span className="text-sm break-words overflow-hidden text-ellipsis line-clamp-3">{data?.name}</span>
        
      </label>
      {hover && (
          <div className="absolute top-1 right-1 flex items-center gap-2">
            <Tooltip
              title="Edit policy"
              className="w-5 h-5 z-50 rounded-full bg-green-500 hover:bg-green-600 transition duration-200 flex items-center justify-center text-white"
            >
              <MdOutlineEdit onClick={handleUpdate} size={5} />
            </Tooltip>
            <Tooltip
              title="Delete policy"
              className="w-5 h-5 z-50 rounded-full bg-red-400 hover:bg-red-500 transition duration-200 flex items-center justify-center text-white"
            >
              <MdOutlineDeleteOutline onClick={handleDelete} size={10} />
            </Tooltip>
          </div>
        )}
        </div>

        {
          showEdit && (<>
          
            <ModelUpdatePolicy typePolicyDefault={typePolicyDefault}  setPolicy={setPolicy} policy={policy} data={data} setShowModel={setShowEdit}/>
          </>)
        }
      
    </>
  )
}

export default Item
