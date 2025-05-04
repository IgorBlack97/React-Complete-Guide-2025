import { useState } from "react";

export default function Player({ name, symbol, saveNewName, isActive }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  function onInputChangeHandler(evt) {
    setPlayerName(evt.target.value);
  }

  function onEditClickHandler(evt) {
    setIsEditing((prevState) => {
      return !prevState;
    });

    if (isEditing) {
      saveNewName(symbol, playerName);
    }
  }

  return (
    <li className={`player ${isActive ? "active" : ""}`}>
      {isEditing ? (
        <input type="text" value={playerName} onChange={onInputChangeHandler} />
      ) : (
        <p className="player-name">{name}</p>
      )}

      <p className="player-symbol">{symbol}</p>
      <button onClick={onEditClickHandler}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
