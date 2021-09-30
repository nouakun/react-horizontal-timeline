import React, { useEffect, useState } from "react";
import HorizontalTimeline from "@twinkble/react-horizontal-timeline";
import items from "./items.json";

import logo from "./logo.svg";
import "./App.css";

function App() {
  const [current, setCurrent] = useState<number>(0);
  const [previous, setPrevious] = useState<number>(0);
  const [rtl, setRtl] = useState<boolean>(false);

  const titles: string[] = items.map((item, index) => item.title);

  const toRtl = () => {
    if (rtl) {
      document.getElementsByTagName("html")[0].dir = "rtl";
    }
  };

  useEffect(() => {
    toRtl();
  }, [rtl]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Blah</p>
        <button
          className="App-link"
          onClick={(e) => {
            e.preventDefault();
            setRtl(!rtl);
          }}
        >
          Try RTL
        </button>
      </header>

      <div className="timeline">
        <HorizontalTimeline
          isRtl={rtl}
          values={titles}
          index={current}
          indexClick={(index: number) => {
            setCurrent(index);
            setPrevious(index);
          }}
        />

        <hr />
        <div>
          {items[current].content.title}
          <br />
          {items[current].content.content}
        </div>
      </div>
    </div>
  );
}

export default App;
