import "./specificCustomer.css";
import { useParams } from "react-router-dom";

export default function SpecificCustomerPage() {
  const { id } = useParams();
  //   const {test} = useOutletContext();

  return (
    <div className="specific_customer_container">
      this is a specific customer with id {id}
    </div>
  );
}
