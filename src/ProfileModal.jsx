import React, { useState, useEffect } from "react";
import "./Components/ProfileModal.css";

export default function ProfileModal({ close }) {
  const currentUser = JSON.parse(localStorage.getItem("auth_user")); // logged-in user
  const employees = JSON.parse(localStorage.getItem("employees")) || [];

  const employee = employees.find((emp) => String(emp.id) === String(currentUser?.id));

  // Load all profiles
  const allProfiles = JSON.parse(localStorage.getItem("profiles")) || [];

  // Check if a profile already exists for this employee
  const existingProfile = allProfiles.find(
    (p) => String(p.employeeId) === String(currentUser?.id)
  );

  const [profile, setProfile] = useState(
    existingProfile || {
      employeeId: currentUser?.id,
      name: employee?.name || "",
      email: employee?.email || "",
      number: "",
      education: "",
      experience: "",
      company: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    const updatedProfiles = [...allProfiles];
    const index = updatedProfiles.findIndex(
      (p) => String(p.employeeId) === String(currentUser?.id)
    );

    if (index !== -1) {
      // update existing
      updatedProfiles[index] = profile;
    } else {
      // add new
      updatedProfiles.push(profile);
    }

    localStorage.setItem("profiles", JSON.stringify(updatedProfiles));

    alert("✅ Profile saved successfully!");
    close();
  };

  return (
    <div className="modal-overlay">
      <div className=" profile-modal">
        <h3>👤 Employee Profile</h3>

        <form onSubmit={handleSave} className="profile-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={profile.name}
              readOnly
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={profile.email}
              readOnly
            />
          </label>

          <label>
            Contact Number:
            <input
              type="tel"
              name="number"
              value={profile.number}
              onChange={handleChange}
              placeholder="e.g. +92-300-xxxxxxx"
            />
          </label>

          <label>
            Education:
            <input
              type="text"
              name="education"
              value={profile.education}
              onChange={handleChange}
              placeholder="BS Computer Science"
            />
          </label>

          <label>
            Experience:
            <input
              type="text"
              name="experience"
              value={profile.experience}
              onChange={handleChange}
              placeholder="2 Years Web Developer"
            />
          </label>

          <label>
            Company Name:
            <input
              type="text"
              name="company"
              value={profile.company}
              onChange={handleChange}
              placeholder="Securitic.ai"
            />
          </label>

          {/* Hidden field: employee ID */}
          <input type="hidden" name="employeeId" value={profile.employeeId} />

          <div className="modal-actions">
            <button type="submit" className="primary-btn">
              Save
            </button>
            <button type="button" className="cancel-btn" onClick={close}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
