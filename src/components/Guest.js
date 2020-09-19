import React from "react";
import "./Guest.css";

function Guest({ guest, handleEditGuest }) {
  return (
    <div className="guest-container">
      <div>{guest.name}</div>
      <div>{guest.address}</div>

      <button onClick={() => handleEditGuest(guest)}>EDIT</button>
    </div>
  );
}

export default Guest;
