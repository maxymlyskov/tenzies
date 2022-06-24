import { useEffect, useState } from "react";
import Dice from "./components/Dice";
import { nanoid } from "nanoid";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

function App() {
  const { width, height } = useWindowSize();

  const [tenzies, setTenzies] = useState(false);
  const generateNewDie = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  };
  const allNewDice = () => {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  };
  const [dices, setDices] = useState(allNewDice());

  useEffect(() => {
    const allHeld = dices.every((die) => die.isHeld);
    const firstDie = dices[0].value;
    const allSameDices = dices.every((die) => die.value === firstDie);
    if (allHeld && allSameDices) {
      setTenzies(true);
      console.log("you won");
    }
  }, [dices]);

  const holdDice = (id) => {
    setDices((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };
  const rollNewDice = () => {
    if (!tenzies) {
      setDices((prevDice) =>
        prevDice.map((die) => (die.isHeld ? die : generateNewDie()))
      );
    } else {
      setTenzies(false);
      setDices(allNewDice());
    }
  };
  const dice = dices.map((dice) => (
    <Dice
      onClick={() => holdDice(dice.id)}
      isHeld={dice.isHeld}
      key={dice.id}
      value={dice.value}
    />
  ));
  const onSave = (totalTime) => {
    console.log(totalTime);
  };
  return (
    <main className="App">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{dice}</div>
      {tenzies ? (
        <>
          <Confetti width={width} height={height} />
          <button className="roll-button" onClick={rollNewDice}>
            New game
          </button>
        </>
      ) : (
        <button className="roll-button" onClick={rollNewDice}>
          Roll
        </button>
      )}
    </main>
  );
}

export default App;
