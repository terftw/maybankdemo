import React, { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MapsPage from "./components/pages/Maps/";

type RoutePathComponent = {
  path: string;
  component: ReactElement;
};

const pages: RoutePathComponent[] = [{ path: "/", component: <MapsPage /> }];

const App = (): React.ReactElement => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {pages.map(({ path, component }) => (
            <Route path={path} element={component} key={path} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
