import React, { useEffect, useState } from 'react';
import api from '../api';

const UserList = () => {
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        getUserList();
    }, []);

    const getUserList = () => {
        api.get('/api/admin/users/')
            .then((res) => res.data)
            .then((data) => {
                console.log("test")
                setUserList(data);
            })
            .catch((err) => alert(err));
    }

    const toggleAdminStatus=(userId,isStaff)=>{
        api.patch(`api/admin/users/${userId}/`,{"is_staff":!isStaff})
        .then((res) => {
            setUserList((prevUserList) =>
                prevUserList.map((user) =>
                    user.id === userId ? { ...user, is_staff: !isStaff } : user
                )
            );
        })
        .catch((err) => alert('Error updating active status: ' + err));
    }

   
    return (
        <div className="container">
            <div className="row">
                {userList.map((user) => {
                    return (
                        <div className="col-md-4 col-sm-12 mb-4" key={user.id}>
                            <div className="card" style={{ width: "18rem" }}>
                                <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdquXwW8fC9SGXoh4JwnckxLYZ4pQJSxGsMg&s" alt="Card image cap" />
                                <div className="card-body">
                                    <h4 className="card-title">{user.email}</h4>
                                    <h5 className='card-title'>{user.name}</h5>
                                    <div className="d-flex gap-2">
                                        {user.is_staff ? (
                                            <button className="btn btn-danger" onClick={()=>toggleAdminStatus(user.id,user.is_staff)}>Remove Admin</button>
                                        ) : (
                                            <button className="btn btn-primary" onClick={()=>toggleAdminStatus(user.id,user.is_staff)}>Make Admin</button>
                                        )}
                                        {
                                            user.is_active ?(
                                                <button className="btn btn-warning">Ban</button>
                                            ):(
                                                <button className="btn btn-success">Active</button>
                                            )
                                        }
                                        
                                        <button className="btn btn-secondary">Details</button>
                                    </div>

                                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default UserList