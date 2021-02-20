import React from "react";
import "./index.css";
import grid from "./grid";

const optsD = {
  rowGap: "40px",
  columnGap: "40px",
  breakpoint: "992px",
};

const optsT = {
  rowGap: "20px",
  columnGap: "20px",
  breakpoint: "768px",
};

const optsM = {
  rowGap: "20px",
  columnGap: "20px",
};

const layout = grid({
  desktop: [
    [optsD, "20%", "20%", "20%", "20%", "20%"],
    ["80px", "Nav", "Nav", "Nav", "Nav", "Nav"],
    ["400px", "Content", "Content", "Content", "Panel", "Panel"],
    ["160px", "Footer1", "Footer1", "Footer2", "Footer2", "Footer3"],
  ],
  tablet: [
    [optsT, "60%", "40%"],
    ["80px", "Nav", "Panel"],
    ["400px", "Content", "Panel"],
    ["100px", "Content", "Footer1"],
    ["100px", "Footer2", "Footer2"],
    ["100px", "Footer3", "Footer3"],
  ],
  mobile: [
    [optsM, "100%"],
    ["80px", "Nav"],
    ["400px", "Content"],
    ["200px", "Panel"],
    ["100px", "Footer1"],
    ["100px", "Footer2"],
    ["100px", "Footer3"],
  ],
});

function App() {
  return (
    <layout.Grid>
      <layout.Nav />
      <layout.Content />
      <layout.Panel />
      <layout.Footer1 />
      <layout.Footer2 />
      <layout.Footer3 />
    </layout.Grid>
  );
}

export default App;
