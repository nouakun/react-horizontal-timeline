import React, { useEffect, useState } from "react";
import HorizontalTimeline from "@twinkble/react-horizontal-timeline";
import items from "./items.json";

import logo from "./logo.png";
import "./App.css";

function App() {
  const [current, setCurrent] = useState<number>(0);
  const [previous, setPrevious] = useState<number>(0);
  const [rtl, setRtl] = useState<boolean>(false);

  const titles: string[] = items.map((item, index) => item.title);

  const toRtl = () => {
    document.getElementsByTagName("html")[0].dir = rtl ? "rtl" : "ltr";
  };

  useEffect(() => {
    toRtl();
  }, [rtl]);

  return (
    <div className="App">
      <div className="container">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>A React port of the horizontal time-line.</p>
          <button
            className="button"
            onClick={(e) => {
              e.preventDefault();
              setRtl(!rtl);
            }}
          >
            Try RTL Version
          </button>
        </header>

        <div className="timeline">
          <HorizontalTimeline
            isRtl={rtl}
            titles={titles}
            index={current}
            onTitleClick={(index: number) => {
              setCurrent(index);
              setPrevious(index);
            }}
            renderTitles={(title: string, index: number) => {
              return (
                <div placeholder={`tab-${index}`}>
                  &#9733;
                  <br /> {title}
                </div>
              );
            }}
          />
        </div>

        <div className="card">
          <h2 className="card-title">{items[current].content.title}</h2>
          <p className="card-content">{items[current].content.content}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
