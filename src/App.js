
import { Route, Switch } from "react-router-dom";
import Port1 from "./Port1/Port1";

function App() {
  return (
    <>
    <Switch>
    <Route exact path="/" component={Port1} />
    </Switch>
    </>
  );
}

export default App;
