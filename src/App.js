import { Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import Port1 from "./Port1/Port1";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/portfolio/1" component={Port1} />
      </Switch>
    </>
  );
}

export default App;
