
import { Link, useNavigate } from "react-router-dom";
import { Bell, Settings, UserRound } from "lucide-react";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar premium-navbar">
      <Link to="/" className="logo">
        <span className="navbar-plane">✈</span>
        <span>Travel <strong>Storyboard</strong></span>
      </Link>

      <div className="navbar-center">
        <span className="navbar-tagline">
          EXPLORE YOUR WORLD
        </span>
      </div>

      <div className="nav-right premium-nav-right">
        {user && (
          <>
            <button
              className="nav-icon-btn"
              type="button"
              aria-label="Settings"
              onClick={() => navigate("/")}
            >
              <Settings size={18} />
            </button>

            <button
              className="nav-icon-btn"
              type="button"
              aria-label="Notifications"
            >
              <Bell size={18} />
            </button>

            <div className="nav-user">
              <span className="nav-user-avatar">
                <UserRound size={19} />
              </span>
              <span className="nav-user-name">
                {user.name}
              </span>
            </div>

            <button
              className="premium-logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
