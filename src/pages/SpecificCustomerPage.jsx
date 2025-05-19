import "./specificCustomer.css";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CustomersContext } from "../App";
import SubscriptionModal from "../components/SubscriptionModal";

export default function SpecificCustomerPage() {
  const { id } = useParams();
  const { customers, setCustomers } = useContext(CustomersContext);

  const [customer, setCustomer] = useState(
    customers.customers.find((c) => c.id === Number(id))
  );
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(customer.user.first_name);
  const [lastName, setLastName] = useState(customer.user.last_name);
  const [email, setEmail] = useState(customer.user.email);
  const [phone, setPhone] = useState(customer.user.phone);
  const [originalData, setOriginalData] = useState({
    firstName: customer.user.first_name,
    lastName: customer.user.last_name,
    email: customer.user.email,
    phone: customer.user.phone,
  });

  const [showSubsModal, setShowSubsModal] = useState(false);

  const activeVehicles = customer.vehicles.filter((v) => v.subscription.active);

  // STYLE SO NO SHIFT ON EDIT
  return (
    <div className="specific_customer_container">
      <div className="specific_customer_info">
        <div className="info">
          <b>First Name: </b>
          {editing ? (
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          ) : (
            <p>{firstName}</p>
          )}
        </div>
        <div className="info">
          <b>Last Name: </b>
          {editing ? (
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          ) : (
            <p>{lastName}</p>
          )}
        </div>
        <div className="info">
          <b>Email: </b>
          {editing ? (
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          ) : (
            <p>{email}</p>
          )}
        </div>
        <div className="info">
          <b>Phone Number: </b>
          {editing ? (
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          ) : (
            <p>{phone}</p>
          )}
        </div>
        <div className="info_row_button">
          {editing ? (
            <>
              <button
                onClick={() => {
                  const updatedCustomers = customers.customers.map((c) => {
                    if (c.id === Number(id)) {
                      return {
                        ...c,
                        user: {
                          ...c.user,
                          first_name: firstName,
                          last_name: lastName,
                          email: email,
                          phone: phone,
                        },
                      };
                    }
                    return c;
                  });
                  setCustomers({ customers: updatedCustomers });
                  localStorage.setItem(
                    "customers",
                    JSON.stringify({ customers: updatedCustomers })
                  );
                  setEditing(false);
                }}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setFirstName(originalData.firstName);
                  setLastName(originalData.lastName);
                  setEmail(originalData.email);
                  setPhone(originalData.phone);
                  setEditing(false);
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setOriginalData({ firstName, lastName, email, phone });
                setEditing(true);
              }}
            >
              Edit
            </button>
          )}
        </div>
      </div>
      <div className="specific_customer_info2">
        <div className="specific_customer_subscription">
          <b>Active Subscriptions</b>
          {activeVehicles.map((v) => (
            <div key={v.id}>
              <p>
                {v.subscription.type}: {v.make} {v.model} {v.license_plate}
              </p>
            </div>
          ))}

          {activeVehicles.length === 0 && <p>No active subscriptions found.</p>}
          <div className="info_row_button">
            <button onClick={() => setShowSubsModal(true)}>Edit</button>
          </div>
        </div>
        <div className="specific_customer_payment">
          <b>Payment</b>
          <p>{`${customer.payment_method.card_type} ${customer.payment_method.last_four}`}</p>
          {activeVehicles.length === 2 ? (
            <p className="white_filler">empty</p>
          ) : (
            <></>
          )}
          <div className="info_row_button">
            <button>Payment History</button>
          </div>
        </div>
      </div>
      <div className="specific_customer_buttons">
        <button>Delete Account</button>
      </div>
      {showSubsModal && (
        <SubscriptionModal
          vehicles={customer.vehicles}
          onSave={(updatedVehicles) => {
            const updated = customers.customers.map((c) =>
              c.id === customer.id ? { ...c, vehicles: updatedVehicles } : c
            );
            setCustomers({ customers: updated });
            localStorage.setItem(
              "customers",
              JSON.stringify({ customers: updated })
            );
            setShowSubsModal(false);
          }}
          onClose={() => setShowSubsModal(false)}
        />
      )}
    </div>
  );
}
