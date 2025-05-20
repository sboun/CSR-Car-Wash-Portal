import "./specificCustomer.css";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CustomersContext } from "../contexts/CustomersContext.jsx";
import SubscriptionModal from "../components/SubscriptionModal";
import Modal from "../components/Modal";

// SHOWS A CUSTOMERS INFO, ACTIVE SUBSCRIPTIONS, PAYMENT
// FEATURES: READ/EDIT INFO AND SUBSCRIPTIONS, DELETE CUSTOMER OBEJCT, GO TO PAYMENT HISTORY PAGE (SpecificHistoryPage)
// POP UP MODALS: EDIT SUBSCRIPTIONS, CONFIRMATION FOR DELETE ACCOUNT
export default function SpecificCustomerPage() {
  const { id } = useParams();
  const { customers, setCustomers } = useContext(CustomersContext);
  const navigate = useNavigate();
  const customer = customers.customers.find((c) => c.id === Number(id)); //use route parameter (id) to get specific customer object
  const activeVehicles = customer.vehicles.filter((v) => v.subscription.active); //display only vehicles with active subscription

  const [firstName, setFirstName] = useState(customer.user.first_name);
  const [lastName, setLastName] = useState(customer.user.last_name);
  const [email, setEmail] = useState(customer.user.email);
  const [phone, setPhone] = useState(customer.user.phone);
  //Original data stored for when user cancels changes
  const [originalData, setOriginalData] = useState({
    firstName: customer.user.first_name,
    lastName: customer.user.last_name,
    email: customer.user.email,
    phone: customer.user.phone,
  });

  const [editing, setEditing] = useState(false);
  const [showSubsModal, setShowSubsModal] = useState(false); //modal shown on active subscription edit button, allows editing subscription
  const [showDeleteModal, setShowDeleteModal] = useState(false); //modal shown on delete account button, confirms deletion with yes/no

  // FUNCTIONS

  //save customer info changes to customers context on save button click
  const handleSave = () => {
    const updated = customers.customers.map((c) =>
      c.id === customer.id
        ? {
            ...c,
            user: {
              ...c.user,
              first_name: firstName,
              last_name: lastName,
              email: email,
              phone: phone,
            },
          }
        : c
    );
    setCustomers({ customers: updated });
    setEditing(false);
  };

  //restore customer info to fields before edit on cancel button click
  const handleCancel = () => {
    setFirstName(originalData.firstName);
    setLastName(originalData.lastName);
    setEmail(originalData.email);
    setPhone(originalData.phone);
    setEditing(false);
  };

  //save initial before making changes to user info on edit click
  const handleEdit = () => {
    setOriginalData({ firstName, lastName, email, phone });
    setEditing(true);
  };

  //sent to subscription modal to handle save click
  const handleSubscriptionSave = (updatedVehicles) => {
    const updated = customers.customers.map((c) =>
      c.id === customer.id ? { ...c, vehicles: updatedVehicles } : c
    );
    setCustomers({ customers: updated });
    setShowSubsModal(false);
  };

  //delete customer account when yes on confirmation modal clicked 
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
          {/* allow user info editing on edit click*/}
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
          {/* display line for each vehicle with active subscription */}
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
          {/* empty lines to make payment history and subscription edit buttons line up */}
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
