import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import ConventionAreaForm from "./ConventionAreaForm";
import ConventionsPage from "./ConventionsPage";
import HostsPage from "./HostsPage";  // Import the HostsPage component

function App() {
    return (
        <Router>
            <main>
                <h1>Convention Agency</h1>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/add-convention-area" component={ConventionAreaForm} />
                    <Route path="/conventions/:areaId" component={ConventionsPage} /> 
                    <Route path="/hosts/:conventionId" component={HostsPage} />  {/* Updated route */}
                </Switch>
            </main>
        </Router>
    );
}

export default App;
