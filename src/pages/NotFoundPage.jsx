import "./notFound.css";
import sadCar from "../assets/sadCar.png";

export default function NotFoundPage() {
  return (
    <div className="not_found_container">
      <h1>Sorry! The page you were looking for does not exist.</h1>
      <img src={sadCar} width="500vw" height="auto"/>
    </div>
  );
}
