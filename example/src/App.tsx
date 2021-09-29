import React, { useState } from "react";
import logo from "./logo.svg";
import HorizontalTimeline from "@twinkble/react-horizontal-timeline";
import items from "./items.json";

function App() {
  const titles = items.map((item) => item.title);
  console.log(titles);
  const [current, setCurrent] = useState<number>(0);
  const [previous, setPrevious] = useState<number>(0);

  const getCurrent = (index: number) => {
    return items[index];
  };

  return (
    <div
      className="App"
      style={{ width: "60%", height: "100px", margin: "0 auto" }}
    >
      <HorizontalTimeline
        values={titles}
        index={current}
        indexClick={(index) => {
          setCurrent(index);
          setPrevious(previous);
        }}
      />

      <div className="text-center">{getCurrent(current).content.title}</div>
    </div>
  );
}

export default App;
