import "./subscriptionModal.css";
import { useState } from "react";
import Modal from "./Modal";

export default function SubscriptionModal({ vehicles, onSave, onClose }) {
  const [subscriptions, setSubscriptions] = useState(
    vehicles.map((v) => ({ ...v }))
  );

  
  const updateVehicle = (i, field, value) => {
    setSubscriptions((prev) => {
      const next = [...prev];
      next[i] = {
        ...next[i],
        [field]: value,
      };
      return next;
    });
  };

  const updateSubscription = (i, field, value) => {
    setSubscriptions((prev) => {
      const next = [...prev];
      next[i] = {
        ...next[i],
        subscription: {
          ...next[i].subscription,
          [field]: value,
        },
      };
      return next;
    });
  };

  const addSub = () => {
    setSubscriptions((prev) => [
      ...prev,
      {
        id: Date.now(),
        make: "",
        model: "",
        license_plate: "",
        subscription: {
          type: "True Luv",
          active: true,
          start_date: "",
          renewal_date: "",
          cancel_date: "",
        },
      },
    ]);
  };

  const removeSub = (i) => {
    setSubscriptions((prev) => prev.filter((_, index) => index !== i));
  };

  return (
    <Modal onClose={onClose}>
      <h2>Edit Subscriptions</h2>
      {subscriptions.map((v, i) => (
        <div key={v.id} className="car_subscription">
          <b>
            {v.make || "<Make>"} {v.model || "<Model>"}
          </b>
          <br />
          <div className="car_info_grid">
            <div className="car_info">
              <b>Make: </b>
              <input
                value={v.make}
                onChange={(e) => updateVehicle(i, ["make"], e.target.value)}
              />
            </div>

            <div className="car_info">
              <b>Model:</b>
              <input
                value={v.model}
                onChange={(e) => updateVehicle(i, ["model"], e.target.value)}
              />
            </div>

            <div className="car_info">
              <b>Plate:</b>
              <input
                value={v.license_plate}
                onChange={(e) =>
                  updateVehicle(i, ["license_plate"], e.target.value)
                }
              />
            </div>

            <div className="car_info">
              <b>Type:</b>
              <select
                defaultValue={v.subscription.type}
                onChange={(e) =>
                  updateSubscription(i, ["type"], e.target.value)
                }
              >
                <option value="True Luv">True Luv</option>
                <option value="All The Luv">All The Luv</option>
                <option value="Lotta Luv">Lotta Luv</option>
                <option value="First Luv">First Luv</option>
              </select>
            </div>

            <div className="car_info">
              <b>Active:</b>
              <input
                type="checkbox"
                checked={v.subscription.active}
                onChange={(e) =>
                  updateSubscription(i, ["active"], e.target.checked)
                }
              />
            </div>

            <div className="car_info">
              <b>Start:</b>
              <input
                type="date"
                value={v.subscription.start_date}
                onChange={(e) =>
                  updateSubscription(i, ["start_date"], e.target.value)
                }
              />
            </div>

            <div className="car_info">
              <b>Renewal:</b>
              <input
                type="date"
                value={v.subscription.renewal_date || ""}
                onChange={(e) =>
                  updateSubscription(i, ["renewal_date"], e.target.value)
                }
              />
            </div>

            <div className="car_info">
              <b>Cancel:</b>
              <input
                type="date"
                value={v.subscription.cancel_date || ""}
                onChange={(e) =>
                  updateSubscription(i, ["cancel_date"], e.target.value)
                }
              />
            </div>

            <div className="button_gap">
              <button onClick={() => removeSub(i)}>Remove</button>
            </div>
          </div>
        </div>
      ))}

      <div className="bottom_buttons">
        <button onClick={addSub}>+ Add Subscription</button>
        <div className="bottom_right_buttons">
          <button onClick={() => onSave(subscriptions)}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
}
