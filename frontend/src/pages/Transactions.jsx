import React, { useState, useEffect } from 'react';
import api from '../api';
import Swal from 'sweetalert2';

const Transactions = () => {
    const [users, setUsers] = useState([]);  
    const [selectedUser, setSelectedUser] = useState('');  
    const [amount, setAmount] = useState('');
    const [transactionType, setTransactionType] = useState('');  
    const [transMode, setTransMode] = useState('');  
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        api.get('/api/admin/customers/')
            .then((response) => setUsers(response.data))
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure a user is selected
        if (!selectedUser) {
            setStatusMessage('Please select a user.');
            return;
        }

        // Check if the amount is less than 1000
        if (parseFloat(amount) < 1000) {
            await Swal.fire({
                title: 'Invalid Amount',
                text: 'The amount must be at least 1000.',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
            return; // Prevent further execution
        }

        // Show confirmation dialog
        const confirmResult = await Swal.fire({
            title: 'Are you sure?',
            text: `You are about to ${transactionType === "deposit" ? "deposit" : "withdraw"} BDT${amount} .`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, proceed!'
        });

        // If confirmed, proceed with the API call
        if (confirmResult.isConfirmed) {
            const transactionData = {
                user: selectedUser,
                amount: parseFloat(amount),
                transaction_type: transactionType,
                trans_mode: transMode,
            };

            api.post('/api/acc/user/create-transaction/', transactionData)
                .then((res) => {
                    setAmount('');
                    setSelectedUser('');
                    setTransMode('');
                    setTransactionType('');
                    setStatusMessage("Transaction Successful");
                    Swal.fire({
                        title: 'Success!',
                        text: 'Transaction has been created successfully.',
                        icon: 'success'
                    });
                })
                .catch((error) => {
                    setStatusMessage('Failed to create transaction');
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to create transaction. Please try again.',
                        icon: 'error'
                    });
                });
        }
    };

    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content mt-2">
            <div>
                <form onSubmit={handleSubmit} className='border mt-4 p-4'>
                    <h2>Create a Transaction</h2>
                    <div className="form-group">
                        <label>User:</label>
                        <select className='form-select'
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            required
                        >
                            <option value="">Select User</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name} ({user.email})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Amount:</label>
                        <input className='form-control'
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Transaction Type:</label>
                        <select
                            className='form-select'
                            value={transactionType}
                            onChange={(e) => setTransactionType(e.target.value)}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="deposit">Deposit</option>
                            <option value="payment">Withdrawal</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Transaction Mode:</label>
                        <select className='form-select'
                            value={transMode}
                            onChange={(e) => setTransMode(e.target.value)}
                            required
                        >
                            <option value="">Select Mode</option>
                            <option value="online">Online</option>
                            <option value="cash">Cash</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Create Transaction</button>
                </form>
               
            </div>
        </main>
    );
};

export default Transactions;
