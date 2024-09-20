import "../styles/ProfileDetails.css";
import { useState, useEffect } from "react";

const ProfileDetails = () => {
  // Initialize form data from localStorage, or default if not present
  const initialData = () => {
    const storedData = localStorage.getItem("formData");
    return storedData
      ? JSON.parse(storedData)
      : {
          name: "",
          email: "",
          phone: "",
        };
  };

  // State to handle if the form is editable or not
  const [isEditable, setIsEditable] = useState(false);

  // State to handle the form data
  const [formData, setFormData] = useState(initialData);

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleEditClick = () => {
    setIsEditable(!isEditable); // Toggle edit mode

    if (isEditable) {
      // Save data to localStorage when editing is done
      localStorage.setItem("formData", JSON.stringify(formData));
      console.log("Form data saved to localStorage:", formData);
      alert("Users details saved Succesfully.");
    }
  };

  const handleDeleteClick = () => {
    let text =
      "Are you sure you want to delete your account? This action cannot be undone.";
    confirm(text)
      ? (localStorage.removeItem("formData"),
        setFormData(initialData()),
        setIsEditable(!isEditable))
      : alert("You Cancelled the Deletion.");
  };

  // Optional: Use useEffect to sync localStorage with formData changes if needed
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    if (isEditable === false && formData.name === "" && formData.email === "") {
      // alert("Please enter your name and email address.");
      setIsEditable(!isEditable);
    }
  }, []); // This ensures data is retrieved from localStorage on page load

  return (
    <div className="profile-details">
      <div className="profile-header">
        <h2>Profile Details</h2>
        <button onClick={handleDeleteClick} className="profile-delete-account">
          Delete Account
        </button>
      </div>
      <form className="profile-form">
        <div className="profile-form-group">
          <label htmlFor="profile-name">Name *</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            readOnly={!isEditable} // Form is editable only when `isEditable` is true
          />
        </div>

        <div className="profile-form-group">
          <label htmlFor="profile-email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            readOnly={!isEditable}
          />
        </div>

        <div className="profile-form-group">
          <label htmlFor="profile-phone">Mobile Number *</label>
          <input
            type="text"
            id="phone"
            placeholder="Enter your mobile number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            readOnly={!isEditable}
          />
        </div>

        {/* Edit/Save Button */}
        <button
          type="button"
          className="profile-edit-btn"
          onClick={handleEditClick}
        >
          {isEditable ? "Save Profile" : "Edit Profile"}{" "}
        </button>
      </form>
    </div>
  );
};

export default ProfileDetails;
