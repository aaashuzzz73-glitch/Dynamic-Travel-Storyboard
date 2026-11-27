
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Settings,
  UserRound,
  X,
  LayoutDashboard,
  User,
  Palette,
  Check,
} from "lucide-react";

import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activePanel, setActivePanel] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const panelRef = useRef(null);

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const togglePanel = (panel) => {
    setActivePanel((current) =>
      current === panel ? null : panel
    );
  };

  const markAllRead = () => {
    setNotifications((previous) =>
      previous.map((item) => ({ ...item, read: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target)
      ) {
        setActivePanel(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <nav className="navbar premium-navbar">
      <Link to="/" className="logo">
        <span className="navbar-plane">✈</span>
        <span>
          Travel <strong>Storyboard</strong>
        </span>
      </Link>

      <div className="navbar-center">
        <span className="navbar-tagline">
          EXPLORE YOUR WORLD
        </span>
      </div>

      <div
        className="nav-right premium-nav-right"
        ref={panelRef}
      >
        {user && (
          <>
            <div className="nav-panel-wrapper">
              <button
                className="nav-icon-btn"
                type="button"
                aria-label="Settings"
                aria-expanded={activePanel === "settings"}
                onClick={() => togglePanel("settings")}
              >
                <Settings size={18} />
              </button>

              {activePanel === "settings" && (
                <div className="nav-dropdown settings-dropdown">
                  <div className="dropdown-heading">
                    <div>
                      <h3>Settings</h3>
                      <p>Manage your account</p>
                    </div>
                    <button
                      className="dropdown-close"
                      onClick={() => setActivePanel(null)}
                      aria-label="Close settings"
                    >
                      <X size={17} />
                    </button>
                  </div>

                  <div className="settings-profile">
                    <span className="nav-user-avatar">
                      <UserRound size={21} />
                    </span>
                    <div>
                      <strong>{user.name}</strong>
                      <p>{user.email || "Travel Storyboard user"}</p>
                    </div>
                  </div>

                  <button
                    className="dropdown-option"
                    onClick={() => {
                      setActivePanel(null);
                      navigate("/dashboard");
                    }}
                  >
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </button>

                  <button
                    className="dropdown-option"
                    onClick={() => {
                      setActivePanel(null);
                      navigate("/profile");
                    }}
                  >
                    <User size={18} />
                    <span>My Account</span>
                  </button>

                  <div className="dropdown-footer">
                    <Palette size={16} />
                    <span>Travel Storyboard Settings</span>
                  </div>
                </div>
              )}
            </div>

            <div className="nav-panel-wrapper">
              <button
                className="nav-icon-btn notification-button"
                type="button"
                aria-label="Notifications"
                aria-expanded={activePanel === "notifications"}
                onClick={() => togglePanel("notifications")}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="notification-count">
                    {unreadCount}
                  </span>
                )}
              </button>

              {activePanel === "notifications" && (
                <div className="nav-dropdown notification-dropdown">
                  <div className="dropdown-heading">
                    <div>
                      <h3>Notifications</h3>
                      <p>
                        {unreadCount > 0
                          ? `${unreadCount} unread notifications`
                          : "Stay updated on your travels"}
                      </p>
                    </div>

                    <button
                      className="dropdown-close"
                      onClick={() => setActivePanel(null)}
                      aria-label="Close notifications"
                    >
                      <X size={17} />
                    </button>
                  </div>

                  {notifications.length > 0 ? (
                    <>
                      <div className="notification-list">
                        {notifications.map((item) => (
                          <div
                            className={`notification-item ${
                              item.read ? "read" : "unread"
                            }`}
                            key={item.id}
                          >
                            <span className="notification-dot" />
                            <div>
                              <strong>{item.title}</strong>
                              <p>{item.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="notification-actions">
                        <button onClick={markAllRead}>
                          <Check size={15} />
                          Mark all as read
                        </button>

                        <button onClick={clearNotifications}>
                          Clear all
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="notification-empty">
                      <span className="notification-empty-icon">
                        <Bell size={25} />
                      </span>
                      <h4>You're all caught up!</h4>
                      <p>
                        New travel updates will appear here.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="nav-user">
              <span className="nav-user-avatar">
                <UserRound size={19} />
              </span>
              <span className="nav-user-name">{user.name}</span>
            </div>

            <button
              className="premium-logout-btn"
              type="button"
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
