import React, { useEffect, useState } from 'react'
import axios from 'axios'

const OrderPage = () => {
  const  [orderData, setOrderData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async (e) => {
    const response = await axios.get('http://localhost:3000/orders')

    setOrderData(response.data)
  }

  console.log(orderData);


  return (
    <div>


    </div>
  )
}

export default OrderPage