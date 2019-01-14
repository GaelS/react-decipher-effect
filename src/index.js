import React from "react";
import ReactDOM from "react-dom";

import T from "./TextShuffler";
import "./styles.css";

let e = "きのうのともはきょうのてき昨日の友は今日の敵";

function App() {
  return (
    <div className="App">
      <T text="YOLO" dictionary={e} />
      <T text="Je suis" delay={300} dictionary={e} />
      <T text="dans" delay={2000} dictionary={e} />
      <T text="la matrice" delay={1000} dictionary={e} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
