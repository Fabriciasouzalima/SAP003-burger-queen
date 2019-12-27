import React from 'react';
import ClientOrders from '../../components/AllOrders/allOrders.js'

import Routes from '../../routes.js'

function KitchenOrders() {
  const existingOrders = ClientOrders() 
  return console.log(existingOrders)

}

export default KitchenOrders;