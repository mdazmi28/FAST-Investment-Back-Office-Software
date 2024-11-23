import React, { useState, useEffect } from "react";
import api from "../api";
import Swal from "sweetalert2";

const PackageForm = () => {
  const [packageName, setPackageName] = useState("");
  const [users, setUsers] = useState([]); // For storing user data from API
  const [amounts, setAmounts] = useState([{ amount: "" }]); // Separate state for amounts
  const [selectedUsers, setSelectedUsers] = useState([{ userId: "" }]); // Separate state for user selection
  const [errors, setErrors] = useState("");

  useEffect(() => {
    api
      .get("/api/admin/customers/")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handlePackageNameChange = (e) => {
    setPackageName(e.target.value);
  };

  const handleAmountChange = (index, value) => {
    const updatedAmounts = [...amounts];
    updatedAmounts[index].amount = value;
    setAmounts(updatedAmounts);
  };

  const handleUserChange = (index, value) => {
    const updatedUsers = [...selectedUsers];
    updatedUsers[index].userId = value;
    setSelectedUsers(updatedUsers);
  };

  const addNewItem = () => {
    setAmounts([...amounts, { amount: "" }]);
    setSelectedUsers([...selectedUsers, { userId: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!packageName) {
      setErrors("Package name is required.");
      return;
    }

    if (
      selectedUsers.some((item) => item.userId === "") ||
      amounts.some((item) => item.amount === "")
    ) {
      setErrors("Each Name and Amount must be filled.");
      return;
    }

    setErrors(""); // Clear errors on successful validation

    // Submit form data
    const formData = {
      packageName,
      items: selectedUsers.map((user, index) => ({
        userId: user.userId,
        amount: amounts[index].amount,
      })),
    };

    console.log("Submitted Data:", formData);

    // Display success message
    Swal.fire("Success!", "Form submitted successfully!", "success");

    // Clear form fields
    setPackageName("");
    setAmounts([{ amount: "" }]);
    setSelectedUsers([{ userId: "" }]);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Package Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>
            <strong>Package:</strong>
          </label>
          <input
            type="text"
            value={packageName}
            onChange={handlePackageNameChange}
            style={{
              display: "block",
              width: "100%",
              padding: "8px",
              marginTop: "5px",
            }}
            placeholder="Enter package name"
          />
        </div>

        {amounts.map((_, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <div className="d-flex flex-row">
              <div style={{ flex: 1, marginRight: "10px" }}>
                <label>Name:</label>
                <select
                  className="form-select"
                  value={selectedUsers[index]?.userId || ""}
                  onChange={(e) => handleUserChange(index, e.target.value)}
                  required
                  style={{ padding: "5px", width: "100%" }}
                >
                  <option value="">Select User</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label>Amount:</label>
                <input
                  type="number"
                  value={amounts[index]?.amount || ""}
                  onChange={(e) =>
                    handleAmountChange(index, e.target.value)
                  }
                  style={{
                    padding: "5px",
                    width: "100%",
                  }}
                  placeholder="Enter amount"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addNewItem}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "8px 12px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Name and Amount
        </button>

        {errors && (
          <p style={{ color: "red", fontSize: "14px" }}>{errors}</p>
        )}

        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PackageForm;
