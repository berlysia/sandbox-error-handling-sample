import React, { useState } from "react";
import MyOldComponent from "./MyOldComponent";
import MyOldClassComponent from "./MyOldClassComponent";
import MyNewComponent from "./MyNewComponent";

const routes = [
  "root",
  "naive state(ok)",
  "naive state(ng)",
  "naive class state(ok)",
  "naive class state(ng)",
  "suspense(ok)",
  "suspense(ng)",
];
type Route = typeof routes[number];

function App() {
  const [route, setRoute] = useState<Route>("root");
  return (
    <div>
      <nav>
        {routes.map((r) => (
          <button key={r} type="button" onClick={() => setRoute(r)}>
            {r}
          </button>
        ))}
      </nav>
      {route === "root" ? <>choose one</> : <div>{route}</div>}
      {route === "naive state(ok)" && <MyOldComponent />}
      {route === "naive state(ng)" && <MyOldComponent ok={false} />}
      {route === "naive class state(ok)" && <MyOldClassComponent />}
      {route === "naive class state(ng)" && <MyOldClassComponent ok={false} />}
      {route === "suspense(ok)" && <MyNewComponent />}
      {route === "suspense(ng)" && <MyNewComponent ok={false} />}
    </div>
  );
}

export default App;
