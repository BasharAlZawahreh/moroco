import {React} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router,Route } from "react-router-dom";
import App from "./App";

//context providers
import AuthProvider from "./contexts/context"

ReactDOM.render(
  <Router>
    <AuthProvider>
    {/* <Route path="/login"> */}
    <App />
    {/* </Route> */}
    </AuthProvider>
  </Router>,
  document.getElementById("root")
);