import React from "react";
import Guest from "./Guest";
import "./GuestGrid.css";

function GuestGrid({ guests, handleEditGuest }) {
  return (
    <div className="guest-grid-container">
      {guests && guests.length
        ? guests.map((guest) => {
            return (
              <Guest
                guest={guest}
                key={guest._id}
                handleEditGuest={handleEditGuest}
              />
            );
          })
        : null}
    </div>
  );
}

export default GuestGrid;
