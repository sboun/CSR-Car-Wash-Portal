import "./specificHistory.css";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CustomersContext } from "../contexts/CustomersContext.jsx";

// SHOW CUSTOMER INFO (FOR CONFIRMATION) AND TABLE SHOWING PAYMENT HISTORY
export default function SpecificHistoryPage() {
  const { id } = useParams();
  const { customers } = useContext(CustomersContext);
  const customer = customers.customers.find((c) => c.id === Number(id));
  return (
    <div className="specific_history_container">
      <div className="specific_customer_info">
        <div className="info">
          <b>Name:</b>
          <p>
            {customer.user.first_name} {customer.user.last_name}
          </p>
        </div>
        <div className="info">
          <b>Payment Method:</b>
          <p>
            {customer.payment_method.card_type}{" "}
            {customer.payment_method.last_four}
          </p>
        </div>
        <div className="info">
          <b>Email:</b>
          <p>{customer.user.email}</p>
        </div>
        <div className="info">
          <b>Phone Number:</b>
          <p>{customer.user.phone}</p>
        </div>
      </div>
      <div className="payment_history">
        <h1>Payment History</h1>
        <table className="table_styling">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Description</th>
              <th>Method</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {customer.payment_history.map((txn) => (
              <tr key={txn.transaction_id}>
                <td>{txn.transaction_id}</td>
                <td>{txn.date}</td>
                <td>{txn.description}</td>
                <td>{txn.payment_method}</td>
                <td>${txn.amount.toFixed(2)}</td>
                <td>{txn.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
