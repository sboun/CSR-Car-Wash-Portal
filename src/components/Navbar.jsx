import "./navbar.css";
import lovLogo from "../assets/lovLogo.png";

export default function Navbar() {
  return (
    <div className="navbar_container">
      <a href="/">
        <img src={lovLogo} alt="Logo" width="75px" height="75px" />
      </a>
      <a href="/customers">Users</a>
      <a href="/customers">Memberships</a>
    </div>
  );
}
