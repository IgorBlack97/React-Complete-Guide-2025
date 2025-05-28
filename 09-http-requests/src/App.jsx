import { useRef, useState, useCallback, useEffect } from "react";

import UserPlaces from "./components/UserPlaces.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import { fetchUserPlaces, updateUserPlaces } from "./http.js";
import Error from "./components/Error.jsx";

function App() {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updatePlacesError, setUpdatePlacesError] = useState(null);

  const [userPlaces, setUserPlaces] = useState([]);
  const [userPlacesLoading, setUserPlacesLoading] = useState(false);
  const [userPlacesLoadingError, setUserPlacesLoadingError] = useState(null);

  useEffect(() => {
    async function getUserPlaces() {
      try {
        setUserPlacesLoading(true);
        const places = await fetchUserPlaces();
        setUserPlaces(places);
        setUserPlacesLoading(false);
      } catch (error) {
        setUserPlacesLoadingError({
          message:
            error.message ||
            "Could not fetch places. Please try again later...",
        });
        setUserPlacesLoading(false);
      }
    }

    getUserPlaces();
  }, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      // reset on error
      setUserPlaces(userPlaces);
      setUpdatePlacesError({
        message: "Failed to update places.",
      });
    }
  }

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      );

      try {
        await updateUserPlaces(
          userPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );
        setModalIsOpen(false);
      } catch (error) {
        // reset on error
        setUserPlaces(userPlaces);
        setUpdatePlacesError({
          message: "Failed to remove place.",
        });
        setModalIsOpen(false);
      }
    },
    [userPlaces]
  );

  function handleUpdateErrorPopupClose() {
    setUpdatePlacesError(null);
  }

  return (
    <>
      <Modal open={updatePlacesError} onClose={handleUpdateErrorPopupClose}>
        {updatePlacesError && (
          <Error
            title="An error occurred!"
            message={updatePlacesError.message}
            onConfirm={handleUpdateErrorPopupClose}
          />
        )}
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <UserPlaces
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
          isLoading={userPlacesLoading}
          loadingText="Your locaitons loading..."
          error={userPlacesLoadingError}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
