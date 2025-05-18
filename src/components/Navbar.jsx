import "./navbar.css";
import lovLogo from "../assets/lovLogo.png"

export default function Navbar() {
  return (
    <div className="navbar_container">
        <a href="/users">
          <img src={lovLogo} alt="Logo" width="75px" height="75px" />
        </a>
        <a href="/users">Users</a>
        <a href="/users">Memberships</a>
    </div>
  );
}
