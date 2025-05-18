import "./customersList.css";
import data from "../data/moretest.json";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomersListPage() {
  const [customers, setCustomers] = useState(data);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  //sort names with first name A-Z
  useEffect(() => {
    const sortedCustomers = [...data.customers].sort((a, b) => 
        a.user.first_name.localeCompare(b.user.first_name));
    setCustomers({customers:sortedCustomers})
    console.log(data);
  }, []);

  const filtered = customers.customers.filter((customer) =>
    (customer.user.first_name.toLowerCase()).includes(searchInput.toLowerCase()) ||
    (customer.user.last_name.toLowerCase()).includes(searchInput.toLowerCase()) ||
    (customer.user.phone.toLowerCase()).includes(searchInput.toLowerCase()) ||
    (customer.user.email.toLowerCase()).includes(searchInput.toLowerCase())
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
        <table className="customers_list_table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
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
            {/* <tr>
              <td>Joe Alpha</td>
              <td>123-123-0123</td>
              <td>joe@gmail.com</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
