import { useState, useEffect } from "react";
import "./styles.css";
import Word from "./components/Word";
const backupWords = [
  "cabby",
  "eagle",
  "early",
  "kabab",
  "oasis",
  "vague",
  "daisy",
  "fangs"
];
const initialState = Array(6).fill("     ");

export default function App() {
  const [words, setWords] = useState(initialState);
  const [count, setCount] = useState(1);
  const [input, setInput] = useState("");
  const [target, setTarget] = useState("");
  const [isLengthFive, setIsLengthFive] = useState(false);
  const [guessed, setGuessed] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://randomf-word-api.herokuapp.cofm/word?length=5"
        );
        const word = await res.json();
        setTarget(word[0].toLowerCase());
      } catch (e) {
        const targetWordIndex = Math.floor(Math.random() * backupWords.length);
        console.log(backupWords[targetWordIndex]);
        setTarget(backupWords[targetWordIndex]);
      }
    })();
  }, []);
  const onChangeHandler = (e) => {
    const value = e.target.value;
    setInput(value.toUpperCase());
    if (value.length === 5) {
      setIsLengthFive(true);
    } else if (value.length > 0 && value.length !== 5) {
      setIsLengthFive(false);
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (input.length !== 5) return words;
    if (input.toLowerCase() === target) {
      setGuessed(true);
    }
    setWords((prev) => {
      const newWords = structuredClone(prev);
      if (count <= words.length) {
        newWords[count - 1] = input;
        return newWords;
      }
      return words;
    });

    setCount((prev) => prev + 1);
    setIsLengthFive(false);
  };
  let gameStatus;
  if (count <= words.length && guessed) {
    gameStatus = "WON";
  } else if (count > words.length && !guessed) {
    gameStatus = "LOST";
  } else {
    gameStatus = "PLAYING";
  }
  let statusContent;
  if (gameStatus === "WON") {
    statusContent = <div className="message">Congratulations! 🎉</div>;
  } else if (gameStatus === "LOST") {
    statusContent = <div className="message">So Sorry!!! 😞</div>;
  }
  return (
    <div className="App">
      <h1>Wordle</h1>
      {statusContent}
      <div className="board">
        {words.map((w, i) => (
          <Word word={w} key={i} target={target} setGuessed={setGuessed} />
        ))}
      </div>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          value={input}
          onChange={onChangeHandler}
          className={!isLengthFive && input.length > 0 ? "not-valid" : "valid"}
          disabled={guessed || gameStatus === "LOST"}
        />
      </form>
      <button
        type="button"
        onClick={() => {
          setWords(initialState);
          setInput("");
        }}
      >
        New Game
      </button>
    </div>
  );
}
