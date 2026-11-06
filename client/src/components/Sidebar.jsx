import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h3>Menu</h3>

      <nav>
        <NavLink to="/">Dashboard</NavLink>

        <NavLink to="/create-trip">
          Create Trip
        </NavLink>

        <NavLink to="/bookings">
          Bookings
        </NavLink>

        <NavLink to="/journal">
          My Journal
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;