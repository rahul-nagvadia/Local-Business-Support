import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "../Styles/OrderPage.css";
import videoBackground from "../Static/order.mp4";

export default function OrderRequest() {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState({});
  const businessid = localStorage.getItem("businessid");
  useEffect(() => {
    const fetchOrders = async () => {
      const formData = new FormData();
      formData.append("businessId", businessid);
      formData.append("res", 1);
      console.log(businessid);
      try {
        const response = await axios.post(
          "http://localhost:8080/order/get-orders-by-businessactive",formData
        );
        console.log(response);
        setOrders(response.data);

        // Fetch item details for each item in the orders
        const itemDetails = {};
        for (const order of response.data) {
          for (const cart of order.carts) {
            for (const itemId in cart.items) {
              if (!itemDetails[itemId]) {
                const itemResponse = await axios.get(
                  `http://localhost:8080/items/${itemId}`
                );
                itemDetails[itemId] = itemResponse.data;
              }
            }
          }
        }
        setItems(itemDetails);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderStatus = async (orderId, status) => {
    try {
      const formData1 = new FormData();
      formData1.append("order_id", orderId);
      formData1.append("res", status);
      await axios.post("http://localhost:8080/order/update-status",formData1);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderId ? { ...order, res: status } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="orders-page">
        <div className="video-container-order">
          <video autoPlay loop muted className="video-bg-order">
            <source src={videoBackground} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="order-page">
          <h1>Order Requests</h1>
          <div className="orders-container">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.order_id} className="order-card">
                  <h2>Order ID: {order.order_id}</h2>
                  <p>Order Date: {new Date(order.order_date).toLocaleString()}</p>
                  
                  <p>Status: {order.res === 1 ? "Pending" : order.res === 2 ? "Accepted" : "Declined"}</p>
                  <div className="order-items">
                    {order.carts &&
                      order.carts.length > 0 &&
                      order.carts[0].items &&
                      typeof order.carts[0].items === "object" &&
                      Object.entries(order.carts[0].items).map(
                        ([itemId, quantity]) => (
                          <div key={itemId} className="order-item">
                            {items[itemId] ? (
                              <>
                                <img src={items[itemId].imageUrl} alt={items[itemId].name} />
                                <div className="order-item-details">
                                  <p>{items[itemId].name}</p>
                                  <p>Quantity: {quantity}</p>
                                </div>
                              </>
                            ) : (
                              <p>Loading item details...</p>
                            )}
                          </div>
                        )
                      )}
                  </div>
                  <div className="order-actions">
                    <button onClick={() => handleOrderStatus(order.order_id, 2)}>
                      Accept
                    </button>
                    <button onClick={() => handleOrderStatus(order.order_id, 0)}>
                      Decline
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No orders found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
