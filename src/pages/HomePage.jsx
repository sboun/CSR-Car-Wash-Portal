import "./home.css";
import { useContext, useMemo } from "react";
import { CustomersContext } from "../contexts/CustomersContext.jsx";

//SHOW INFO CARDS WITH # CUSTOMERS AND # OF ACTIVE SUBSCRIPTIONS
export default function HomePage() {
  const { customers } = useContext(CustomersContext);

  // Searches through customers, returns total number of active subscriptions
  const activeSubscriptions = useMemo(() => {
    let count = 0;
    for (let i = 0; i < customers.customers.length; i++) {
      const customer = customers.customers[i];
      for (let j = 0; j < customer.vehicles.length; j++) {
        const vehicle = customer.vehicles[j];
        if (vehicle.subscription && vehicle.subscription.active) {
          count++;
        }
      }
    }
    return count;
  }, [customers]);

  return (
    <div className="home_container">
      <h1>Customer Service Representative Portal</h1>
      <div className="home_card_container">
        <div className="home_card">
          <h3>Total Customers</h3>
          <b>{customers.customers.length}</b>
        </div>
        <div className="home_card">
          <h3>Active Subscriptions</h3>
          <b>{activeSubscriptions}</b>
        </div>
      </div>
    </div>
  );
}
