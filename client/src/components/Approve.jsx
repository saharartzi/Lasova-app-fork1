import React from 'react'
import {useState, useEffect } from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';

//import { ReactComponent as ApprovedIcon } from '../assets/imgs/icons/approve-basic-checklist-svgrepo-com.svg'

export default function Approve({row,approveHours}) {
  
  //const dispatch = useDispatch();



      
  /*let { volunteer } = useSelector((state) => state.volunteerReducer);*/
  
 /* function approveHours(row) { //naama
    console.log(row._id)
    console.log(row.firstName)
    if (!row.hours || !row.hours.length) return
    if (row.hours[0].verified===true || row.hours[0].verified==="true") return
    console.log(row.hours)
    let lastHours=row.hours.shift()
    let hoursApproval=({...lastHours,verified:true}) 
    let hours=[hoursApproval,...row.hours]
    let currVol={...row,hours}
    console.log(currVol,"/n",lastHours,"/n",hoursApproval)
    //dispatch(loadVolunteerById(row._id))
  }*/

  return (
    <div>
    {row.hours.length && (row.hours[0].verified===false || row.hours[0].verified==="false") && (
    <div className='approve-hours'>
      <div>
        <p>{row.hours[0].date}</p>
        <p>{row.hours[0].start}-{row.hours[0].end}</p>
      </div>
      <button className="approve-hours-btn" onClick={()=>approveHours(row)}>אישור</button>
    </div>
    )}
    {(!row.hours.length || row.hours[0].verified===true) && (
    <BsFillCheckCircleFill className='circle-approve'/>
  )}
  </div>
  )
}
