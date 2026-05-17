import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import React, { useState } from "react";
import News from "./Components/News";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 10;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  const [progress, setprogress] = useState(0)


  return (
    <div>
      <Router>
        <LoadingBar height={3} color="#f11946" progress={progress} />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <News
                setprogress={setprogress}
                apiKey={apiKey}
                key="general"
                pageSize={pageSize}
                category="general"
              />
            }
          ></Route>
          <Route
            path="/business"
            element={
              <News
                setprogress={setprogress}
                apiKey={apiKey}
                key="business"
                pageSize={pageSize}
                category="business"
              />
            }
          ></Route>
          <Route
            path="/entertainment"
            element={
              <News
                setprogress={setprogress}
                apiKey={apiKey}
                key="entertainment"
                pageSize={pageSize}
                category="entertainment"
              />
            }
          ></Route>
          <Route
            path="/health"
            element={
              <News
                setprogress={setprogress}
                apiKey={apiKey}
                key="health"
                pageSize={pageSize}
                category="health"
              />
            }
          ></Route>
          <Route
            path="/science"
            element={
              <News
                setprogress={setprogress}
                apiKey={apiKey}
                key="science"
                pageSize={pageSize}
                category="science"
              />
            }
          ></Route>
          <Route
            path="/sports"
            element={
              <News
                setprogress={setprogress}
                apiKey={apiKey}
                key="sports"
                pageSize={pageSize}
                category="sports"
              />
            }
          ></Route>
          <Route
            path="/technology"
            element={
              <News
                setprogress={setprogress}
                apiKey={apiKey}
                key="technology"
                pageSize={pageSize}
                category="technology"
              />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
