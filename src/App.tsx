import React, { Suspense } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import './App.css';
import routes from "./routes";
import { Spin } from "antd";

const Routes = () => {
    return useRoutes(routes);
};
function App() {
  return (
      <BrowserRouter>
          <Suspense fallback={<Spin size="large" />}>
              <Routes />
          </Suspense>
      </BrowserRouter>
  );
}

export default App;
