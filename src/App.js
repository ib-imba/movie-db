import React, { useState } from "react";
import axios from "axios";

import Search from "./components/Search";
import Results from "./components/Results";
import Popup from "./components/Popup";

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });
  const apiurl = "https://www.omdbapi.com/?apikey=2548b9eb";

  const search = e => {
    if (e.key === "Enter" && state.s && state.s.length >= 3) {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        let results = data.Search;
        // console.log(data);
        setState(prevState => {
          return { ...prevState, results: results };
        });
      });
    }
  };

  const handleInput = e => {
    let s = e.target.value;

    setState(prevState => {
      return { ...prevState, s: s };
    });
    // console.log(s);
  };

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      // console.log(result);

      setState(prevState => {
        return { ...prevState, selected: result };
      });
    });
  };

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} };
    });
  };

  return (
    <div className="App">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main>
        <Search
          handleInput={handleInput}
          search={search}
          results={state.results}
        />
        <small>{state.s.length < 3 ? "min. 3 characters" : null}</small>
        <Results results={state.results} openPopup={openPopup} />

        {typeof state.selected.Title != "undefined" ? (
          <Popup selected={state.selected} closePopup={closePopup} />
        ) : (
          false
        )}
      </main>
      <footer>
        <a href="https://bit.ly/2vOTwgY" target="_blank">
          <img src="./img/download_w.png" alt="logo" width="24" height="24" />
          <div>See project</div>
        </a>
      </footer>
    </div>
  );
}

export default App;
