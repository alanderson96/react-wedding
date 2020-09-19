import React from "react";
import "./App.css";
import GuestGrid from "./components/GuestGrid";
import Modal from "./components/Modal";
import AddEditGuestForm from "./components/AddEditGuestForm";
import {
  getGuests,
  createGuest,
  updateGuest,
  deleteGuest,
} from "./GuestsServices";

function App() {
  const [
    isShowingAddEditGuestModal,
    setIsShowingAddEditGuestModal,
  ] = React.useState(false);
  const [currentGuest, setCurrentGuest] = React.useState(null);
  const [isLoading, setisLoading] = React.useState(false);
  const [originalGuests, setOriginalGuest] = React.useState([]);
  const [guests, setGuests] = React.useState(() => {
    fetchGuests();

    return [];
  });
  const [searchQuery, setSearchQuery] = React.useState("");
  React.useEffect(() => {
    if (!searchQuery) {
      setGuests(originalGuests);
      return;
    }

    const filteredGuests = originalGuests.filter((guest) => {
      const searchQueryLowerCase = searchQuery.toLowerCase();
      const guestNameLowerCase = guest.name.toLowerCase();

      if (
        guestNameLowerCase.startsWith(searchQueryLowerCase) ||
        guestNameLowerCase.includes(searchQueryLowerCase)
      ) {
        return true;
      }
    });

    setGuests(filteredGuests);
  }, [searchQuery]);

  function fetchGuests() {
    setisLoading(true);

    getGuests()
      .then((response) => {
        setOriginalGuest(response.data);
        setGuests(response.data);
      })
      .catch((error) => {
        debugger;
      })
      .finally(() => {
        setisLoading(false);
      });
  }

  function handleAddGuestClick() {
    setIsShowingAddEditGuestModal(true);
  }
  function handleCloseModal() {
    setIsShowingAddEditGuestModal(false);
  }
  function handleCreateGuest(guest) {
    createGuest(guest)
      .then((response) => {
        setIsShowingAddEditGuestModal(false);
        alert("Succestfully Created New Item");
        fetchGuests();
      })
      .catch((error) => {
        alert(error);
      });
  }
  function handleEditGuest(guest) {
    setCurrentGuest(guest);
    setIsShowingAddEditGuestModal(true);
  }
  function handleUpdateGuest(guest) {
    updateGuest(guest._id, guest)
      .then((response) => {
        setIsShowingAddEditGuestModal(false);
        alert("Successfully Updated Guest");
        fetchGuests();
      })
      .catch((error) => {
        alert(error);
      });
  }
  function handleDeleteGuest(guest) {
    deleteGuest(guest._id)
      .then((response) => {
        setIsShowingAddEditGuestModal(false);
        alert("Successfully Deleted Guest");
        fetchGuests();
      })
      .catch((error) => {
        alert(error);
      });
  }
  return (
    <div className="App">
      <button onClick={handleAddGuestClick}>CREATE NEW GUEST</button>
      {isShowingAddEditGuestModal ? (
        <Modal>
          <AddEditGuestForm
            existingGuest={currentGuest}
            handleCloseModal={handleCloseModal}
            handleCreateGuest={handleCreateGuest}
            handleUpdateGuest={handleUpdateGuest}
            handleDeleteGuest={handleDeleteGuest}
          />
        </Modal>
      ) : null}

      <h1>React Wedding App</h1>
      <input
        type="text"
        className="search-input"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      {/* {isLoading ? <LoadingSpinner /> : null} */}

      <GuestGrid guests={guests} handleEditGuest={handleEditGuest} />
      {!isLoading && guests.length === 0 ? <h3>No Results Found</h3> : null}
    </div>
  );
}

export default App;

