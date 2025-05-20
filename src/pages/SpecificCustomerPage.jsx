import "./specificCustomer.css";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CustomersContext } from "../App";
import SubscriptionModal from "../components/SubscriptionModal";
import Modal from "../components/Modal";

export default function SpecificCustomerPage() {
  const { id } = useParams();
  const { customers, setCustomers } = useContext(CustomersContext);
  const navigate = useNavigate();
  const customer = customers.customers.find((c) => c.id === Number(id));
  const activeVehicles = customer.vehicles.filter((v) => v.subscription.active);

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

  const [editing, setEditing] = useState(false);
  const [showSubsModal, setShowSubsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // FUNCTIONS
  const handleSave = () => {
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
    setEditing(false);
  };

  const handleCancel = () => {
    setFirstName(originalData.firstName);
    setLastName(originalData.lastName);
    setEmail(originalData.email);
    setPhone(originalData.phone);
    setEditing(false);
  };

  const handleEdit = () => {
    setOriginalData({ firstName, lastName, email, phone });
    setEditing(true);
  };

  const handleSubscriptionSave = (updatedVehicles) => {
    const updated = customers.customers.map((c) =>
      c.id === customer.id ? { ...c, vehicles: updatedVehicles } : c
    );
    setCustomers({ customers: updated });
    setShowSubsModal(false);
  };

  const handleDelete = () => {
    const updated = customers.customers.filter((c) => c.id !== Number(id));
    setCustomers({ customers: updated });
    navigate("/customers");
  };

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
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button onClick={handleEdit}>Edit</button>
          )}
        </div>
      </div>

      <div className="specific_customer_info2">
        <div className="specific_customer_subscription">
          <b>Active Subscriptions</b>
          {activeVehicles.map((vehicle) => (
            <div key={vehicle.id}>
              <p>
                {vehicle.subscription.type}: {vehicle.make} {vehicle.model}{" "}
                {vehicle.license_plate}
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
          <p>
            {customer.payment_method.card_type}{" "}
            {customer.payment_method.last_four}
          </p>
          {/* empty lines to make buttons line up */}
          {activeVehicles.length > 1 &&
            Array.from({ length: activeVehicles.length - 1 }).map((_, i) => (
              <p key={i} className="empty_filler">
                empty
              </p>
            ))}
          <div className="info_row_button">
            <button
              onClick={() => navigate(`/customers/history/${customer.id}`)}
            >
              Payment History
            </button>
          </div>
        </div>
      </div>
      <div className="specific_customer_buttons">
        <button onClick={() => setShowDeleteModal(true)}>Delete Account</button>
      </div>

      {/* MODALS */}
      {showSubsModal && (
        <SubscriptionModal
          vehicles={customer.vehicles}
          onSave={handleSubscriptionSave}
          onClose={() => setShowSubsModal(false)}
        />
      )}

      {showDeleteModal && (
        <Modal
          onClose={() => setShowDeleteModal(false)}
          className="delete_modal"
        >
          <h1>Are you sure you want to delete this account?</h1>
          <div className="delete_modal_buttons">
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setShowDeleteModal(false)}>No</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
