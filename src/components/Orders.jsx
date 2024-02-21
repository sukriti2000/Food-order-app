import { useEffect } from "react";
import useHttp from "../hooks/useHttp.js";
import Error from "./UI/Error.jsx";
import Header from "./Header.jsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Orders() {
  const { data, isLoading, error, sendRequest } = useHttp(
    "http://localhost:3000/orders/email",
    requestConfig,
    []
  );

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(user);
    if (user) {
      // Parse the JSON string to object
      const userData = JSON.parse(user);
      // Extract email from userData
      const userEmail = userData.email;
      // Use the useEffect hook to send the request when the component mounts
      sendRequest(JSON.stringify({ email: userEmail }));
    }
  }, [sendRequest]); // Dependency array to ensure the effect runs only on mount

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  if (!data) {
    return <p>No Orders found.</p>;
  }
  if (data) console.log(data);
  return (
    <div className="orders-container">
      <Header />
      <div className="orders">
        {data.map((order) => (
          <div className="order" key={order.id}>
            <div className="customer-info">
              <p>
                <strong>Email:</strong> {order.customer.email}
              </p>
              <p>
                <strong>Postal Code:</strong> {order.customer.postalCode}
              </p>
              <p>
                <strong>City:</strong> {order.customer.city}
              </p>
            </div>
            <div className="items">
              <h3>Items:</h3>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    <div className="item">
                      <p>
                        <strong>Name:</strong> {item.name}
                      </p>
                      <p>
                        <strong>Price:</strong> ${item.price}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
