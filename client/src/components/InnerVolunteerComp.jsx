import React from 'react'

import GeneralData from './VolunteerData/GeneralData'
import ExtraData from './VolunteerData/ExtraData'
import VolunteerHours from './VolunteerData/VolunteerHours'

function TestInnerComp(info) {
  

 
  return (
    <div className='innerBox'>
       <div className='general-box1'>
        <GeneralData data={info}/>    
       </div>

       <div className='general-box2'>
        {/* <ExtraData data={info}/>     */}
       </div>

       <div className='general-box3'>
        <VolunteerHours data={info}/>    
       </div>
    
    </div>
  )
}

export default TestInnerComp