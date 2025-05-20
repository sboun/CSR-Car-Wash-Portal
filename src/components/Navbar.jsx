import "./navbar.css";
import lovLogo from "../assets/lovLogo.png";

//TOP NAVBAR, LOGO GOES TO HOME PAGE, OTHERS GO TO CUSTOMERS TABLE
export default function Navbar() {
  return (
    <div className="navbar_container">
      <a href="/">
        <img src={lovLogo} alt="Logo" width="75px" height="75px" />
      </a>
      <a href="/customers">Users</a>
      {/* OPTIONAL MEMBERSHIPS PAGE FOR LATER IMPLEMENTATION - SHOW MEMBERSHIP DETAILS/PRICES FOR LOV CAR WASH SO CSR CAN REFERENCE */}
      <a href="/customers">Memberships</a>
    </div>
  );
}
