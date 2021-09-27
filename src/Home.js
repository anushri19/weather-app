import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Login from "./Login";
import App from './App';

function Home() {
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/weather-report" component={App}></Route>
      </Switch>
    </Router>
  )
}
export default Home;