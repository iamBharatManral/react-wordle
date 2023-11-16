const charStyles = {
  width: "60px",
  height: "60px",
  border: "1px solid lightgray",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  backgroundColor: "lightgray",
  borderRadius: "2px"
};

const Char = ({ ch, type }) => {
  let typeStyle = {};
  if (type === "CORRECT") {
    typeStyle["backgroundColor"] = "green";
  } else if (type === "AVAILABLE") {
    typeStyle["backgroundColor"] = "gold";
  } else if (type === "NOT_AVAILABLE") {
    typeStyle["backgroundColor"] = "black";
  }
  return <div style={{ ...charStyles, ...typeStyle }}>{ch.toUpperCase()}</div>;
};

export default Char;
