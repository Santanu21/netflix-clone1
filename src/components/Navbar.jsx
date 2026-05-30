import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await signOut(auth);
    navigate("/login");
  } catch (error) {
    console.log(error);
  }
};
  return (
    <nav className="navbar">
  <h1>NETFLIX</h1>

  <div className="nav-right">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
      alt="profile"
    />

    <button onClick={handleLogout}>
      Logout
    </button>
  </div>
</nav>
  );
}

export default Navbar;