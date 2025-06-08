import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { setupTokenRefresh } from "./utils/tokenUtils";
import "./App.css";

function App() {
  useEffect(() => {
    // Setup automatic token refresh
    setupTokenRefresh();
  }, []);

  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
