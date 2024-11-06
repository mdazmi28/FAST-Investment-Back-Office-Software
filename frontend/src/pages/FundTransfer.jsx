import React, { useState, useEffect } from "react";
import api from "../api";

const FundTransfer = () => {
  const [users, setUsers] = useState([]);
  const [fromUser, setFromUser] = useState("");
  const [toUser, setToUser] = useState("");

//   console.log(fromUser)

  useEffect(() => {
    api
      .get("/api/admin/customers/")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  return (
    <div>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content mt-2">
        <div>
          <form
            // onSubmit={handleSubmit}
            className="border mt-4 p-4"
          >
            <h2>Fund Transfer</h2>
            <div className="form-group">
              <label>From User:</label>
              <select
                className="form-select"
                value={fromUser}
                onChange={(e) => setFromUser(e.target.value)}
                required
              >
                <option value="">Select User</option>
                {users.filter((user) => user.id !== Number(toUser)).map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>To User:</label>
              <select
                className="form-select"
                value={toUser}
                onChange={(e) => setToUser(e.target.value)}
                required
              >
                <option value="">Select User</option>
                {users.filter((user) => user.id !== Number(fromUser)).map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Amount:</label>
              <input
                className="form-control"
                type="number"
                // value={amount}
                // onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Transaction Mode:</label>
              <select
                className="form-select"
                // value={transMode}
                // onChange={(e) => setTransMode(e.target.value)}
                required
              >
                <option value="">Select Mode</option>
                <option value="online">Online</option>
                <option value="cash">Cash</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Create Transaction
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default FundTransfer;
