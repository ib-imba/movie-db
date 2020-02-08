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

  const [error, setError] = useState({
    message: null
  });

  const apiurl = "https://www.omdbapi.com/?apikey=2548b9eb";

  const search = e => {
    if (e.key === "Enter") {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        // console.log(data);
        let results = data.Search;
        if (data.Response === "True") {
          setState(prevState => {
            return {
              ...prevState,
              results: results
            };
          });
        } else {
          setError({
            message: data.Error
          });
        }
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

  const hasMessage = error.message;
  const minCharacters = state.s.length < 3;

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
        <div className="messages">
          {hasMessage ? <small>{error.message}</small> : null}
          {minCharacters ? <small>min. 3 characters</small> : null}
        </div>
        <Results results={state.results} openPopup={openPopup} />

        {typeof state.selected.Title != "undefined" ? (
          <Popup selected={state.selected} closePopup={closePopup} />
        ) : (
          false
        )}
      </main>
      <footer>
        <a href="https://bit.ly/2vOTwgY" target="_blank">
          <img
            src="https://frozen-hollows-63691.herokuapp.com/img/download_w.f1b19e7e.png"
            alt="logo"
            width="24"
            height="24"
          />
          <div>See project</div>
        </a>
      </footer>
    </div>
  );
}

export default App;
