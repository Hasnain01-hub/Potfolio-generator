import '../App.css';
import React from "react";
function Props({ setcounter, counter, refs }) {
  const design = () => {
    refs.current.style.fontWeight = "lighter";
  }
  return (
    <>
      <input placeholder="Enter msg" onChange={(e) => setcounter(e.target.value)} />
      <button onClick={design}>Lighter</button>
    </>
  );
}
export default Props;