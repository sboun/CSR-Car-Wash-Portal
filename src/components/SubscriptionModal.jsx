import "./subscriptionModal.css";
import { useState } from "react";
import Modal from "./Modal";

export default function SubscriptionModal({ vehicles, onSave, onClose }) {
  //subscription clone
  const [subscriptions, setSubscriptions] = useState(
    vehicles.map((v) => ({ ...v }))
  );

  const updateField = (i, path, value) => {
    setSubscriptions((prev) => {
      const next = [...prev];
      let o = next[i];
      const lastKey = path[path.length - 1];
      const target = path.slice(0, -1).reduce((acc, k) => acc[k], o);
      target[lastKey] = value;
      return next;
    });
  };

  const addSub = () => {
    setSubscriptions((prev) => [
      ...prev,
      {
        id: Date.now(), // temporary key
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
    setSubscriptions((prev) =>
      prev.filter((subscription, index) => index !== i)
    );
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
                onChange={(e) => updateField(i, ["make"], e.target.value)}
              />
            </div>

            <div className="car_info">
              <b>Model:</b>
              <input
                value={v.model}
                onChange={(e) => updateField(i, ["model"], e.target.value)}
              />
            </div>

            <div className="car_info">
              <b>Plate:</b>
              <input
                value={v.license_plate}
                onChange={(e) =>
                  updateField(i, ["license_plate"], e.target.value)
                }
              />
            </div>

            <div className="car_info">
              <b>Type:</b>
              <select
                defaultValue={v.subscription.type}
                onChange={(e) =>
                  updateField(i, ["subscription", "type"], e.target.value)
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
                  updateField(i, ["subscription", "active"], e.target.checked)
                }
              />
            </div>

            <div className="car_info">
              <b>Start:</b>
              <input
                type="date"
                value={v.subscription.start_date}
                onChange={(e) =>
                  updateField(i, ["subscription", "start_date"], e.target.value)
                }
              />
            </div>

            <div className="car_info">
              <b>Renewal:</b>
              <input
                type="date"
                value={v.subscription.renewal_date || ""}
                onChange={(e) =>
                  updateField(
                    i,
                    ["subscription", "renewal_date"],
                    e.target.value
                  )
                }
              />
            </div>

            <div className="car_info">
              <b>Cancel:</b>
              <input
                type="date"
                value={v.subscription.cancel_date || ""}
                onChange={(e) =>
                  updateField(
                    i,
                    ["subscription", "cancel_date"],
                    e.target.value
                  )
                }
              />
            </div>

            <div>
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
