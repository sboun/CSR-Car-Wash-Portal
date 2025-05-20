import "./customersList.css";
import { useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CustomersContext } from "../contexts/CustomersContext.jsx";

export default function CustomersListPage() {
  const [searchInput, setSearchInput] = useState("");
  const { customers } = useContext(CustomersContext);
  const navigate = useNavigate();

  //sort names with first name A-Z
  const sortedCustomers = useMemo(
    () =>
      [...customers.customers].sort((a, b) => {
        const comparison = a.user.first_name.localeCompare(b.user.first_name);
        return comparison
          ? comparison
          : a.user.last_name.localeCompare(b.user.last_name);
      }),
    [customers.customers]
  );

  //filters searched values
  const filtered = sortedCustomers.filter(
    (customer) =>
      customer.user.first_name
        .toLowerCase()
        .includes(searchInput.toLowerCase()) ||
      customer.user.last_name
        .toLowerCase()
        .includes(searchInput.toLowerCase()) ||
      customer.user.phone.toLowerCase().includes(searchInput.toLowerCase()) ||
      customer.user.email.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="customers_list_container">
      <div className="customers_list_content">
        <div className="customers_list_search">
          <h1>Customer Details</h1>
          <input
            type="text"
            placeholder="🔍 Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <table className="table_styling">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {/* table row created for each customer */}
            {filtered.map((customer) => (
              <tr
                key={customer.id}
                onClick={() => navigate(`/customers/${customer.id}`)}
              >
                <td>{`${customer.user.first_name} ${customer.user.last_name}`}</td>
                <td>{customer.user.phone}</td>
                <td>{customer.user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
