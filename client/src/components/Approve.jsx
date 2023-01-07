import React from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';

export default function Approve({ row, approveHours }) {
  return (
    <>
      {row.hours.length >= 0 && (row.hours[0]?.verified === false || row.hours[0]?.verified === 'false') && (
        <div className="approve-hours">
          <div>
            <p>{row.hours[0]?.date}</p>
            <p>
              {row.hours[0]?.start}-{row.hours[0]?.end}
            </p>
          </div>
          <button className="approve-hours-btn" onClick={() => approveHours(row)}>
            אישור
          </button>
        </div>
      )}
      {row.hours[0]?.verified === true && <BsFillCheckCircleFill className="circle-approve" />}
    </>
  );
}
