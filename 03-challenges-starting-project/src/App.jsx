import { useRef, useState } from "react";
import Player from "./components/Player.jsx";
import Challenge from "./components/Challenge.jsx";

function App() {
  const nameRef = useRef();
  const [playerData, setPlayerData] = useState({
    name: null,
  });

  function onSaveNameHandler() {
    setPlayerData((prevState) => ({
      ...prevState,
      name: nameRef.current.value,
    }));
  }

  return (
    <>
      <Player
        ref={nameRef}
        onSave={onSaveNameHandler}
        playerData={playerData}
      />
      <div id="challenges">
        <Challenge title="Easy" targetTime={1} />
        <Challenge title="Not Easy" targetTime={5} />
        <Challenge title="Getting tough" targetTime={10} />
        <Challenge title="Pros only" targetTime={15} />
      </div>
    </>
  );
}

export default App;
