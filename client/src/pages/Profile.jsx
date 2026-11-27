
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  UserRound,
  Mail,
  CalendarDays,
  Edit3,
  Save,
  X,
} from "lucide-react";
import "./Profile.css";

const Profile = () => {
  const { user, updateProfile } = useContext(AuthContext);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEdit = () => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setError("");
    setSuccess("");
    setEditing(true);
  };

  const handleCancel = () => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setError("");
    setEditing(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !email.trim()) {
      setError("Please enter both your name and email.");
      return;
    }

    try {
      setSaving(true);

      const result = await updateProfile({
        name: name.trim(),
        email: email.trim(),
      });

      setName(result.user.name);
      setEmail(result.user.email);
      setSuccess("Your profile has been updated successfully.");
      setEditing(false);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Not available";

  return (
    <div className="app-layout travel-dashboard profile-page">
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-content profile-content">
          <div className="profile-heading">
            <div>
              <span className="profile-eyebrow">YOUR ACCOUNT</span>
              <h1>My Profile</h1>
              <p>Manage your personal information and account details.</p>
            </div>
          </div>

          <section className="profile-card">
            <div className="profile-cover">
              <div className="profile-avatar">
                <UserRound size={42} />
              </div>
            </div>

            <div className="profile-main">
              <div className="profile-user-heading">
                <div>
                  <h2>{user?.name || "Traveler"}</h2>
                  <p>{user?.email || "No email available"}</p>
                </div>

                {!editing && (
                  <button className="profile-edit-btn" onClick={handleEdit}>
                    <Edit3 size={16} />
                    Edit Profile
                  </button>
                )}
              </div>

              {error && <div className="profile-message error">{error}</div>}
              {success && (
                <div className="profile-message success">{success}</div>
              )}

              {editing ? (
                <form className="profile-form" onSubmit={handleSave}>
                  <div className="profile-field">
                    <label htmlFor="profile-name">Full Name</label>
                    <input
                      id="profile-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="profile-field">
                    <label htmlFor="profile-email">Email Address</label>
                    <input
                      id="profile-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="profile-actions">
                    <button
                      type="button"
                      className="profile-cancel-btn"
                      onClick={handleCancel}
                      disabled={saving}
                    >
                      <X size={16} />
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="profile-save-btn"
                      disabled={saving}
                    >
                      <Save size={16} />
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="profile-details">
                  <div className="profile-detail-item">
                    <span className="profile-detail-icon">
                      <UserRound size={19} />
                    </span>
                    <div>
                      <small>Full Name</small>
                      <strong>{user?.name || "Not available"}</strong>
                    </div>
                  </div>

                  <div className="profile-detail-item">
                    <span className="profile-detail-icon">
                      <Mail size={19} />
                    </span>
                    <div>
                      <small>Email Address</small>
                      <strong>{user?.email || "Not available"}</strong>
                    </div>
                  </div>

                  <div className="profile-detail-item">
                    <span className="profile-detail-icon">
                      <CalendarDays size={19} />
                    </span>
                    <div>
                      <small>Member Since</small>
                      <strong>{joinedDate}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;
