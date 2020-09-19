import React from "react";
import "./AddEditGuestForm.css";


function AddEditGuestForm({
  handleCloseModal,
  handleCreateGuest,
  existingGuest,
  handleUpdateGuest,
  handleDeleteGuest,
}) {
  const [name, setName] = React.useState(
    existingGuest ? existingGuest.name : ""
  );
  const [address, setAddress] = React.useState(
    existingGuest ? existingGuest.address : ""
  );
 
  const [errors, setErrors] = React.useState({
    name: null,
    address: null,
    
  });

  function handleSubmit(event) {
    event.preventDefault();

    const errors = {
      name: null,
      address: null,
      
    };

    if (name.length === 0) {
      errors.name = "Guest Name Cannon be Empty";
    }
    if (address === 0) {
      errors.address = "Guest Address Cannot be Empty";
    }
    if (errors.name || errors.address ) {
      setErrors(errors);
      return;
    }
    const guest = {
      name: name,
      address: address,
    
    };
    if (existingGuest) {
      guest._id = existingGuest._id;
      handleUpdateGuest(guest);
    } else {
      handleCreateGuest(guest);
    }
  }
  return (
    <div className="add-edit-guest-form-container">
      <h1>{existingGuest ? "Edit Guest" : "Add Guest"}</h1>
      <form onSubmit={handleSubmit} className="Guest-form">
        <label>
          Name<span className="required">*</span>:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? "invalid" : ""}
          />
          {errors.name ? <span className="required">{errors.name}</span> : null}
        </label>
        <label>
          Address<span className="required">*</span>:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={errors.address ? "invalid" : ""}
          />
          {errors.address ? (
            <span className="required">{errors.address}</span>
          ) : null}
        </label>
  
        <button>{existingGuest ? "Save & Close" : "Create & Close"}</button>
      </form>
      <button onClick={handleCloseModal}>CLOSE</button>
      {existingGuest ? (
        <button onClick={() => handleDeleteGuest(existingGuest)}>
          DELETE
        </button>
      ) : null}
    </div>
  );
}
export default AddEditGuestForm;
