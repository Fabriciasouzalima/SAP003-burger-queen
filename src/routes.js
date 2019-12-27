import React from 'react';

import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Order from './pages/order.js/Order.js'
import clientOrders from './pages/Kitchen/Kitchen.js'

const Routes = () => (
    <BrowserRouter>
     <Switch>
         <Route exact path ='/' component={Order}/>
         <Route path ='/products/:id' component={clientOrders}/>         
     </Switch>
    </BrowserRouter>
);

export default Routes; 
