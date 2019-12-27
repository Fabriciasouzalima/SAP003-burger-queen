import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Order from './pages/order.js/Order.js';
import Kitchen from './pages/Kitchen/Kitchen.js';
import Header from './components/Header/index.js';

const App = () => {
    return (
        <Router>
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/Order" component={Order} />
                    <Route path="/Kitchen" component={Kitchen} />
                </Switch>
            </div>
        </Router>);
};

export default App;
