import Char from "./Char";

const wordStyles = {
  display: "flex",
  gap: "4px"
};

const Word = ({ word, target }) => {
  const determineValidity = (ch, i) => {
    switch (true) {
      case ch !== " " && target.includes(ch) && target[i] === ch:
        return "CORRECT";
      case ch !== " " && target.includes(ch):
        return "AVAILABLE";
      case ch !== " " && !target.includes(ch):
        return "NOT_AVAILABLE";
      default:
        return "DEFAULT";
    }
  };
  return (
    <div style={wordStyles}>
      {Array.from(word).map((ch, i) => {
        return (
          <Char ch={ch} key={i} type={determineValidity(ch.toLowerCase(), i)} />
        );
      })}
    </div>
  );
};

export default Word;
