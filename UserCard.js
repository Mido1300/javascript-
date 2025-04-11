import React from 'react';

function UserCard({ user }) {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={`${user.name}`} />
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        <span className={`status ${user.isActive ? 'active' : ''}`}>
          {user.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
    </div>
  );
}

export default UserCard;
