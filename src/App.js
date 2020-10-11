//React imports
import React from 'react';
//Router imports
import {Redirect, Router} from "@reach/router";
//Local imports
import CountryList from "./components/country-list.component";
import CountryDetails from "./components/country-details.component";

const App = () => {
    return (
        <div>
            <div className="container mt-3">
                <Router>
                    <CountryList path="countries"/>
                    <CountryDetails path="countries/:id"/>
                    <Redirect from="/" to="/countries" default noThrow/>
                </Router>
            </div>
        </div>
    );
};

export default App;
