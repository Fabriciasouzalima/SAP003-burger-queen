import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Order from './pages/order.js/Order.js';
import Kitchen from './pages/Kitchen/Kitchen.js';
import Delivery from './pages/Delivery/delivery.js';
import Login from './pages/Login/login.js'

const Routes = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/order" component={Order} />
                    <Route path="/kitchen" component={Kitchen} />
                    <Route path="/Delivery" component={Delivery}/>
                </Switch>
            </div>
        </Router>);
};

export default Routes;
